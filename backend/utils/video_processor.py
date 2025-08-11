import cv2
import mediapipe as mp
import numpy as np
from scipy.ndimage import gaussian_filter1d
import logging

class VideoProcessor:
    def __init__(self):
        self.mp_pose = mp.solutions.pose
        self.pose = self.mp_pose.Pose(static_image_mode=False, min_detection_confidence=0.7, min_tracking_confidence=0.7)
        self.landmarks_list = []
        self.logger = logging.getLogger(__name__)

    def process_video(self, video_path):
        self.logger.info(f"Processing video: {video_path}")
        cap = cv2.VideoCapture(video_path)
        if not cap.isOpened():
            self.logger.error(f"Failed to open video file: {video_path}")
            raise ValueError("Error opening video file. Please ensure the file is a valid MP4 or AVI.")

        fps = cap.get(cv2.CAP_PROP_FPS)
        frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        duration = frame_count / fps if fps > 0 else 0
        
        if fps < 20:  # Updated to allow 20 FPS
            cap.release()
            self.logger.error(f"Video FPS ({fps:.2f}) is below 20")
            raise ValueError("Video FPS is too low (must be at least 20). Please use a video with a higher frame rate.")
        if duration < 15 or duration > 120:  # Updated to allow 15 seconds
            cap.release()
            self.logger.error(f"Video duration ({duration:.2f}s) is outside 15-120s range")
            raise ValueError("Video duration must be between 15 and 120 seconds.")

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = self.pose.process(frame_rgb)

            if results.pose_landmarks:
                landmarks = [(lm.x, lm.y, lm.z, lm.visibility) for lm in results.pose_landmarks.landmark]
                self.landmarks_list.append(landmarks)
            else:
                self.landmarks_list.append(None)

        cap.release()
        self.logger.info(f"Processed {len(self.landmarks_list)} frames")
        
        if not any(self.landmarks_list):
            self.logger.error("No valid pose landmarks detected in any frame")
            raise ValueError("No valid pose landmarks detected. Ensure the video shows a clear side view of a person walking.")
            
        return self.smooth_landmarks(self.landmarks_list, fps)

    def smooth_landmarks(self, landmarks_list, fps):
        if not landmarks_list:
            self.logger.error("Empty landmarks list")
            raise ValueError("No landmarks to smooth")

        smoothed = []
        for i in range(33):  # 33 keypoints in MediaPipe Pose
            x_coords = []
            y_coords = []
            z_coords = []
            visibilities = []
            
            for lm in landmarks_list:
                if lm and len(lm) > i:
                    x_coords.append(lm[i][0])
                    y_coords.append(lm[i][1])
                    z_coords.append(lm[i][2])
                    visibilities.append(lm[i][3])
                else:
                    x_coords.append(np.nan)
                    y_coords.append(np.nan)
                    z_coords.append(np.nan)
                    visibilities.append(0.0)

            # Interpolate missing landmarks
            if not any(np.isfinite(x_coords)):
                self.logger.error(f"No valid data for landmark {i}")
                continue
                
            valid_indices = np.where(np.isfinite(x_coords))[0]
            if len(valid_indices) < 2:
                self.logger.warning(f"Insufficient valid data for landmark {i}")
                continue
                
            x_coords = np.interp(np.arange(len(x_coords)), valid_indices, np.array(x_coords)[valid_indices])
            y_coords = np.interp(np.arange(len(y_coords)), valid_indices, np.array(y_coords)[valid_indices])
            z_coords = np.interp(np.arange(len(z_coords)), valid_indices, np.array(z_coords)[valid_indices])
            
            # Apply smoothing
            x_coords = gaussian_filter1d(x_coords, sigma=1.0)
            y_coords = gaussian_filter1d(y_coords, sigma=1.0)
            z_coords = gaussian_filter1d(z_coords, sigma=1.0)
            
            smoothed.append([(x, y, z, v) for x, y, z, v in zip(x_coords, y_coords, z_coords, visibilities)])

        if not smoothed:
            self.logger.error("No landmarks successfully smoothed")
            raise ValueError("Failed to smooth landmarks. Please try a different video.")
            
        return smoothed, fps