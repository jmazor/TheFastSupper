import requests
import json
import time

# Set the parameters for the API request
params = {
    "location": "28.6024,-81.2001",  # UCF
    "radius": 50000,  # 50 kilometers
    "type": "restaurant",
    "key": "AP_KEY_HERE"
}

results = []

# Loop through the pages of results to get up to 1000 results
while len(results) < 1000:
    # Make the API request
    response = requests.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json", params=params)
    data = response.json()
    # Check if there are any results
    if "results" in data:
        # Add the results to the list
        results.extend(data["results"])
    
    # Check if there are more pages of results
    if "next_page_token" in data:
        # Wait for a few seconds to give the server time to generate the next page token
        time.sleep(3)
        # Update the parameters with the next page token
        params["pagetoken"] = data["next_page_token"]
    else:
        # If there are no more pages, break out of the loop
        break

# Write the results to a JSON file
with open("results.json", "w") as outfile:
    json.dump(results, outfile, indent=4)

print(f"Got {len(results)} results.")
