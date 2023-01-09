"""configuration class"""
pars_ = {}

def get_parameter(par_):
    """Get config parameter"""
    return pars_[par_]

class Config:
    """class to obtain config parameters"""
    def get_par(self, par__):
        """Get config parameter"""
        return get_parameter(par__)
    def set_par(self, par__, val__):
        """Set config parameter"""
        pars_[par__]=val__

#parametro de bbdd source

#parametros de paths
pars_["wav_dir"]='C:/Users/rcastillosi/__DATA__/WAVS/pistas_demo/'
pars_["mp3_dir"]="C:/Users/rcastillosi/__DATA__/WAVS/mp3/"
