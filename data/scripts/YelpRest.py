import requests
import json

# Define the Yelp API endpoint and parameters
url = 'https://api.yelp.com/v3/businesses/search'
headers = {'Authorization': 'Bearer API_KEY'}
params = {'categories': 'restaurants', 'limit': 50}

# Define a list of neighborhoods in Orlando and their sub-regions
neighborhoods = {
    'Downtown': ['North Downtown', 'South Downtown', 'Parramore'],
    'Mills 50': ['Lake Formosa', 'Colonialtown North', 'Colonialtown South'],
    'Thornton Park': ['Thornton Park', 'South Eola'],
    'College Park': ['College Park', 'Lake Adair'],
    'Audubon Park': ['Audubon Park', 'Baldwin Park'],
    'Ivanhoe Village': ['Ivanhoe Village', 'Lake Ivanhoe'],
    'Lake Eola Heights': ['Lake Eola Heights', 'Northeast'],
    'Milk District': ['Milk District', 'Coytown', 'Bel Air']
}

# Send multiple API requests to retrieve all businesses in each sub-region of each neighborhood
restaurants = []
business_ids = set()
for neighborhood, subregions in neighborhoods.items():
    for subregion in subregions:
        params['location'] = f'Orlando {neighborhood} {subregion}'
        offset = 0
        while True:
            params['offset'] = offset
            response = requests.get(url, headers=headers, params=params)
            data = response.json()
            if 'businesses' in data:
                for business in data['businesses']:
                    if business['id'] not in business_ids:
                        restaurants.append(business)
                        business_ids.add(business['id'])
            else:
                print(f'Error retrieving businesses for {subregion}:', data.get('error', {}).get('description'))
                break

            if offset >= 950:
                print(f'Retrieved {offset} restaurants for {subregion}, breaking out of loop')
                break

            if len(data['businesses']) < 50:
                print(f'Retrieved {len(data["businesses"])} restaurants for {subregion}, moving on to next subregion')
                break

            offset += 50

# Print the number of restaurants retrieved and save to a file
print(f'Retrieved {len(restaurants)} restaurants')
with open('restaurants.json', 'w') as file:
    json.dump(restaurants, file, indent=4)
