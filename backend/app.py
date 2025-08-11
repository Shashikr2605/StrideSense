import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import uuid
import logging
from backend.models.gait_analyzer import GaitAnalyzer
from backend.utils.video_processor import VideoProcessor

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Configure logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@app.route('/api/upload', methods=['POST'])
def upload_video():
    if 'file' not in request.files:
        logger.error("No file provided in upload request")
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    if not file.filename.lower().endswith(('.mp4', '.avi')):
        logger.error(f"Invalid file format: {file.filename}")
        return jsonify({'error': 'Invalid file format. Only MP4 and AVI are supported'}), 400
    
    file_id = str(uuid.uuid4())
    file_ext = os.path.splitext(file.filename)[1].lower()
    file_path = os.path.join(UPLOAD_FOLDER, f'{file_id}{file_ext}')
    file.save(file_path)
    logger.info(f"File uploaded: {file_path}")
    
    return jsonify({'file_id': file_id}), 200

@app.route('/api/analyze', methods=['POST'])
def analyze_gait():
    data = request.get_json()
    file_id = data.get('file_id')
    if not file_id:
        logger.error("No file_id provided in analyze request")
        return jsonify({'error': 'No file_id provided'}), 400
    
    file_path = None
    for ext in ['.mp4', '.avi']:  # Check for both extensions
        potential_path = os.path.join(UPLOAD_FOLDER, f'{file_id}{ext}')
        if os.path.exists(potential_path):
            file_path = potential_path
            break
    
    if not file_path or not os.path.exists(file_path):
        logger.error(f"File not found for file_id: {file_id}")
        return jsonify({'error': 'File not found'}), 404
    
    try:
        logger.info(f"Starting analysis for file: {file_path}")
        processor = VideoProcessor()
        landmarks, fps = processor.process_video(file_path)
        if not landmarks:
            logger.error("No landmarks detected in video")
            return jsonify({'error': 'No valid pose landmarks detected in video'}), 400
        
        analyzer = GaitAnalyzer()
        results = analyzer.analyze_gait(landmarks, fps)
        results['file_id'] = file_id
        logger.info(f"Analysis completed for file_id: {file_id}")
        
        try:
            os.remove(file_path)
            logger.info(f"File deleted: {file_path}")
        except Exception as e:
            logger.warning(f"Failed to delete file {file_path}: {str(e)}")
            
        return jsonify(results), 200
    except Exception as e:
        logger.error(f"Analysis failed: {str(e)}", exc_info=True)
        return jsonify({'error': f'Analysis failed: {str(e)}'}), 500

@app.route('/api/results/<file_id>', methods=['GET'])
def get_results(file_id):
    logger.info(f"Results requested for file_id: {file_id}")
    return jsonify({'error': 'Results storage not implemented'}), 501

@app.route('/api/recommendations', methods=['POST'])
def get_recommendations():
    data = request.get_json()
    abnormalities = data.get('abnormalities', [])
    logger.info(f"Generating recommendations for abnormalities: {abnormalities}")
    analyzer = GaitAnalyzer()
    recommendations = []
    for ab in abnormalities:
        if ab['type'] in analyzer.exercise_database:
            recommendations.extend(analyzer.exercise_database[ab['type']].get('strengthening', []) + 
                                 analyzer.exercise_database[ab['type']].get('mobility', []) +
                                 analyzer.exercise_database[ab['type']].get('gait_training', []))
    return jsonify({'recommendations': recommendations}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)