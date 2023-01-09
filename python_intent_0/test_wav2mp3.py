"""test_wav2mp3.py"""

from pydub import AudioSegment
from class_config import Config

cfg = Config()
origen  = cfg.get_par('wav_dir')
destino = cfg.get_par('mp3_dir')

audio_Segment = AudioSegment.from_wav(f'{origen}oeee12.wav')

audio_Segment.export(f'{destino}oeee12.mp3', format='mp3')

