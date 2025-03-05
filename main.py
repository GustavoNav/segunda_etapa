from stages.extract.extractor import Extractor
from stages.transform.transformer import Transformer
from stages.load.loader import Loader

DATA_PATH = "data/Arquivo_CSV_de_Vendas.csv"

# Definição dos objetos
extractor = Extractor()
transformer = Transformer()
loader = Loader()

# Extração
raw_data = extractor.extract(DATA_PATH)

# Transformação
transformed_data = transformer.transform(raw_data)

#Carga
loader.load_to_postgres(transformed_data)
loader.load_to_mongo(transformed_data)
