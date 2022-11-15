import requests
from config import api_key
import pandas as pd

link = 'https://api.themoviedb.org/3/movie/top_rated?api_key={}&language=en-US&page=1'.format(api_key)

responses = requests.get(link)

data = pd.DataFrame(responses.json()["results"])[['id','title','overview','popularity','release_date','vote_average','vote_count']]

print(data.head())