import subprocess
import os

def extract_audio(video_path, audio_path):

    # Run the ffmpeg command to extract audio
    command = [
        "ffmpeg",
        "-i", video_path,           # input video file
        "-q:a", "0",                # high-quality audio
        "-map", "a",                # extract audio
        audio_path         # output audio file
    ]

    subprocess.run(command)

def extract_frames(video_path, output_folder, frame_rate=1):
    command = [
        "ffmpeg",
        "-i", video_path,  # input video
        "-vf", f"fps={frame_rate}",  # extract one frame per second
        f"{output_folder}/frame_%04d.png"  # output file format
    ]
    subprocess.run(command)

if __name__=="__main__":
    extract_audio("./ursuletii.mp4", "./audio.mp3")
    extract_frames("./ursuletii.mp4", "./poze/")