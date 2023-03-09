import requests
import json

# Define the Yelp API endpoint and parameters
url = 'https://api.yelp.com/v3/businesses/{id}/reviews'
headers = {'Authorization': 'Bearer API_KEY'}

# Load the restaurant data from file
with open('restaurants.json', 'r') as file:
    restaurants = json.load(file)

# Loop through the restaurants and retrieve reviews
reviews_by_restaurant = {}
for restaurant in restaurants:
    business_id = restaurant['id']
    offset = 0
    reviews = []
    while offset < 998:
        params = {'limit': 3, 'offset': offset}
        response = requests.get(url.format(id=business_id), headers=headers, params=params)
        data = response.json()
        if 'reviews' in data:
            # Add the business ID to each review
            for review in data['reviews']:
                review['business_id'] = business_id
            reviews.extend(data['reviews'])
        else:
            print(f'Error retrieving reviews for {business_id}:', data.get('error', {}).get('description'))
            break
        offset += 3

    if reviews:
        reviews_by_restaurant[business_id] = reviews


# Print the number of reviews retrieved and save to a file
print(f'Retrieved reviews for {len(reviews_by_restaurant)} restaurants')
with open('reviews.json', 'w') as file:
    json.dump(reviews_by_restaurant, file, indent=4)
