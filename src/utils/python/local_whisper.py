import whisper
import sys
import warnings

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

print(result["segments"])