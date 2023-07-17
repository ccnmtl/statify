import csv
import json
import re
import sys


FEATURES = [
    'key', 'tempo', 'acousticness', 'speechiness', 'danceability',
    'energy', 'loudness', 'popularity'
]


if __name__ == '__main__':
    # Set up the files
    file = sys.argv[1]
    outfile = re.sub('csv$', 'json', file)
    with open(file) as csvfile, open(outfile, 'w') as jsfile:
        # Initialize the checks and data stores
        current_genre = None
        features = {}
        reader = csv.DictReader(csvfile)
        results = {}
        # Step through the rows of the CSV file
        for line in reader:
            genre = line['genre']
            if genre != current_genre:
                # Triggers after the last of the previous genre was stored
                if current_genre is not None:
                    # Store the datasets
                    for item in FEATURES:
                        results[current_genre][item] = features[item]
                # Set up the new genre
                results[genre] = {'count': 1}
                for item in FEATURES:
                    features[item] = []
                current_genre = genre
            # After check append current data
            for item in FEATURES:
                features[item].append(float(line[item]))
            results[genre]["count"] += 1
        # Process the last genre data
        for item in FEATURES:
            results[current_genre][item] = features[item]
        json.dump(results, jsfile)
