import whisper
import sys
import warnings
import json
import os

warnings.filterwarnings("ignore")

args = sys.argv[1:]
try:
    ffmpeg_path = args[0]
    audio_path = args[1]
except:
    raise Exception("Insufficient arguments provided. Please provide the path to the ffmpeg executable and the path to the audio file.")

os.environ['PATH'] = ffmpeg_path + ';' + os.environ['PATH'] # set the current path to where ffmpeg is located


if len(args) > 2:
    mode = args[2]
else:
    mode = "transcribe"

model = whisper.load_model("base")
audio = whisper.load_audio(audio_path)

result = model.transcribe(audio, task=mode, verbose=False)
json_result = json.dumps(result)

print(json_result)