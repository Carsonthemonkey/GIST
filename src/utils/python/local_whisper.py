import whisper
import sys
import warnings
import json

warnings.filterwarnings("ignore")

args = sys.argv[1:]
audio_path = args[0]

if len(args) > 1:
    mode = args[1]
else:
    mode = "transcribe"

model = whisper.load_model("base")
audio = whisper.load_audio(audio_path)

# This will need to include translation via a command line arg
result = model.transcribe(audio, task=mode)
json_result = json.dumps(result)

print(json_result)