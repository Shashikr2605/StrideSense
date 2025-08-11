import numpy as np
from math import atan2, degrees
import logging

class GaitAnalyzer:
    def __init__(self):
        self.exercise_database = {
            'step_asymmetry': {
                'strengthening': [
                    {
                        'name': 'Single Leg Stance',
                        'duration': '30 seconds x 3 sets',
                        'instructions': 'Stand on affected leg, maintain balance',
                        'progression': 'Close eyes for increased difficulty'
                    }
                ],
                'mobility': [
                    {
                        'name': 'Hip Mutations: L1239-1240',
                        'duration': '30 seconds hold x 3 reps',
                        'instructions': 'Lunge position, push hips forward'
                    }
                ]
            },
            'abnormal_cadence': {
                'gait_training': [
                    {
                        'name': 'Metronome Walking',
                        'duration': '10 minutes',
                        'instructions': 'Walk to a metronome set at 100-120 steps/min'
                    }
                ]
            }
        }
        self.logger = logging.getLogger(__name__)

    def calculate_angle(self, p1, p2, p3):
        try:
            v1 = np.array([p1[0] - p2[0], p1[1] - p2[1]])
            v2 = np.array([p3[0] - p2[0], p3[1] - p2[1]])
            cosine_angle = np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))
            angle = degrees(np.arccos(np.clip(cosine_angle, -1.0, 1.0)))
            return angle
        except Exception as e:
            self.logger.error(f"Angle calculation failed: {str(e)}")
            return 0.0

    def analyze_gait(self, landmarks, fps):
        try:
            heel_strikes = self.detect_heel_strikes(landmarks, fps)
            if not heel_strikes:
                self.logger.error("No heel strikes detected")
                raise ValueError("No heel strikes detected")
                
            cycles = self.segment_cycles(landmarks, heel_strikes)
            if not cycles:
                self.logger.error("No gait cycles segmented")
                raise ValueError("No gait cycles detected")

            # Calculate metrics
            metrics = {
                'step_length_left': [],
                'step_length_right': [],
                'cadence': len(heel_strikes) / (len(landmarks) / fps / 60) if fps > 0 else 0,
                'hip_angle': [],
                'knee_angle': [],
                'ankle_angle': [],
            }

            for cycle in cycles:
                if not cycle or len(cycle[0]) < 34:  # Ensure enough landmarks
                    self.logger.warning("Invalid cycle data")
                    continue
                    
                left_ankle = cycle[0][33] if len(cycle[0]) > 33 else [0, 0, 0, 0]
                right_ankle = cycle[0][32] if len(cycle[0]) > 32 else [0, 0, 0, 0]
                next_left_ankle = cycle[-1][33] if len(cycle[-1]) > 33 else [0, 0, 0, 0]
                next_right_ankle = cycle[-1][32] if len(cycle[-1]) > 32 else [0, 0, 0, 0]
                
                metrics['step_length_left'].append(np.linalg.norm(np.array(left_ankle[:2]) - np.array(next_right_ankle[:2])))
                metrics['step_length_right'].append(np.linalg.norm(np.array(right_ankle[:2]) - np.array(next_left_ankle[:2])))
                
                # Joint angles (simplified)
                hip = self.calculate_angle(
                    cycle[0][23] if len(cycle[0]) > 23 else [0, 0, 0, 0],
                    cycle[0][25] if len(cycle[0]) > 25 else [0, 0, 0, 0],
                    cycle[0][27] if len(cycle[0]) > 27 else [0, 0, 0, 0]
                )
                knee = self.calculate_angle(
                    cycle[0][25] if len(cycle[0]) > 25 else [0, 0, 0, 0],
                    cycle[0][27] if len(cycle[0]) > 27 else [0, 0, 0, 0],
                    cycle[0][31] if len(cycle[0]) > 31 else [0, 0, 0, 0]
                )
                ankle = self.calculate_angle(
                    cycle[0][27] if len(cycle[0]) > 27 else [0, 0, 0, 0],
                    cycle[0][31] if len(cycle[0]) > 31 else [0, 0, 0, 0],
                    cycle[0][33] if len(cycle[0]) > 33 else [0, 0, 0, 0]
                )
                metrics['hip_angle'].append(hip)
                metrics['knee_angle'].append(knee)
                metrics['ankle_angle'].append(ankle)

            if not metrics['step_length_left'] or not metrics['step_length_right']:
                self.logger.error("No valid step lengths calculated")
                raise ValueError("Failed to calculate step lengths")
                
            metrics['step_asymmetry'] = (np.mean(metrics['step_length_left']) - np.mean(metrics['step_length_right'])) / \
                                      (np.mean(metrics['step_length_left']) + np.mean(metrics['step_length_right'])) * 100
                                      
            return self.classify_abnormalities(metrics)
        except Exception as e:
            self.logger.error(f"Gait analysis failed: {str(e)}", exc_info=True)
            raise

    def detect_heel_strikes(self, landmarks, fps):
        heel_strikes = []
        for i in range(1, len(landmarks) - 1):
            if landmarks[i] and len(landmarks[i]) > 33 and landmarks[i-1] and landmarks[i+1]:
                velocity = (landmarks[i+1][33][1] - landmarks[i-1][33][1]) * fps
                if velocity > 0 and (landmarks[i][33][1] - landmarks[i-1][33][1]) < 0:
                    heel_strikes.append(i)
        return heel_strikes

    def segment_cycles(self, landmarks, heel_strikes):
        cycles = []
        for i in range(len(heel_strikes) - 1):
            cycle = landmarks[heel_strikes[i]:heel_strikes[i+1]]
            if cycle:
                cycles.append(cycle)
        return cycles

    def classify_abnormalities(self, metrics):
        abnormalities = []
        try:
            if abs(metrics['step_asymmetry']) > 10:
                abnormalities.append({
                    'type': 'step_asymmetry',
                    'severity': 'moderate' if abs(metrics['step_asymmetry']) < 20 else 'severe',
                    'affected_side': 'left' if metrics['step_asymmetry'] > 0 else 'right'
                })
            if metrics['cadence'] < 100 or metrics['cadence'] > 120:
                abnormalities.append({
                    'type': 'abnormal_cadence',
                    'value': round(metrics['cadence'], 1),
                    'normal_range': '100-120 steps/min'
                })
            if np.mean(metrics['hip_angle']) < 30:
                abnormalities.append({'type': 'reduced_hip_flexion', 'value': round(np.mean(metrics['hip_angle']), 1)})
            if np.mean(metrics['knee_angle']) < 60:
                abnormalities.append({'type': 'reduced_knee_flexion', 'value': round(np.mean(metrics['knee_angle']), 1)})
            if np.mean(metrics['ankle_angle']) < 20:
                abnormalities.append({'type': 'reduced_ankle_flexion', 'value': round(np.mean(metrics['ankle_angle']), 1)})
            
            recommendations = []
            for ab in abnormalities:
                if ab['type'] in self.exercise_database:
                    recommendations.extend(self.exercise_database[ab['type']].get('strengthening', []) + 
                                       self.exercise_database[ab['type']].get('mobility', []) +
                                       self.exercise_database[ab['type']].get('gait_training', []))
            
            return {'metrics': metrics, 'abnormalities': abnormalities, 'recommendations': recommendations}
        except Exception as e:
            self.logger.error(f"Abnormality classification failed: {str(e)}")
            raise