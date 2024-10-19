from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from pprint import pprint
import pymongo
from bson.objectid import ObjectId


uri = "mongodb+srv://tanvir:tanvir@cluster0.7xdebar.mongodb.net/cloud_computing_lab?retryWrites=true&w=majority&appName=Cluster0"


# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# extract the films in the database
col_films = client.cloud_computing_lab.films
# print(col_films.find_one())

# pprint is used to print JSON document structurally
# pprint(col_films.find_one())


# create a new collection in the cloud_computing_lab as users
# the collection will not be created(if not created before) untill a data is added.
col_users = client.cloud_computing_lab.users
user1 = {
		"user_name":"Tom Jones",
		"user_age":44,
		"user_location":"London"
		}
# col_users.insert_one(user1)
# print("record added!")

# print the new user that was added
# pprint(col_users.find_one())


# add multiple records at once
user2 = {
		"user_name":"Jane Williams",
		"user_age":50,
		"user_location":"London"
		}

user3 = {
		"user_name":"Kate Johnson",
		"user_age":35,
		"user_location":"Brighton"
		}
# col_users.insert_many([user2, user3])

# pprint(col_users.find_one())

# extract specific record
# pprint(col_users.find_one({},{"user_name": 1, "user_location":1,  "_id":0}))

#extract data using for loop
# for record in col_users.find():
#     pprint(record)


# sort the results
# result = col_users.find().sort("user_age", 1)
# for user in result:
#     pprint(user)


# extract the youngest user
# youngest_user = col_users.find().sort("user_age", 1).limit(1)
# pprint(youngest_user[0])


# search for users older than 45
# results = col_users.find({"user_age": {"$gt": 45}}, {})
# for user in results:
#     pprint(user)



# Select user_name, user_age and user_location for users older than 45. (uuery customization)
# results = col_users.find({"user_age": {"$gt": 45}}, {"_id": 0, "user_name": 1, "user_age": 1, "user_location": 1})
# for user in results:
# 	pprint(user)


# # Let's extract the users from London. For this query let's printuser_name and user_location.
# results = col_users.find({"user_location": {"$eq": "London"}}, {"_id": 0, "user_name": 1, "user_location": 1})
# for user in results:
# 	pprint(user)


# Pipeline

# Let's create an aggregation to group data by user_location
# agg_result = col_users.aggregate([
# 	{
# 		"$group": 
# 			{"_id": "$user_location",
# 			"num_instances": {"$sum": 1}
# 			}
		
# 	}
# ])
# for result in agg_result:
# 	pprint(result)



# Let's create a pipeline to aggregate data, our first pipeline has two steps:
# Step 1: Select users from London
# Step 2: Then, sort the data in ascending order
# pipeline = [
# 	{
# 		"$match": {
# 			"user_location": "London"
# 		}
# 	},
# 	{
# 		"$sort": {
# 			"user_age": pymongo.ASCENDING
# 		}
# 	}
# ]
# agg_result = col_users.aggregate(pipeline)
# for result in agg_result:
# 	pprint(result)




# Now, let's create a second aggregation pipeline, this one has the next three steps:
# Step 1: Select users from London
# Step 2: Sort the data in descending order
# Step 3: Limit the data to extract top record

# stage_match_location = {
# 	"$match": {
# 		"user_location": "London"
# 	}
# }
# stage_sort_age_descending = {
# 	"$sort": {
# 		"user_age": pymongo.DESCENDING
# 	}
# }
# stage_limit_1 = {
# 	"$limit": 1
# }
# pipeline = [stage_match_location, stage_sort_age_descending, stage_limit_1]
# agg_result = col_users.aggregate(pipeline)
# for result in agg_result:
# 	pprint(result)



# Let's try something new , we will insert a new user and then we will associate the new user with a new film
# user4 = {
# 		"user_name":"Dan Berry",
# 		"user_age":64,
# 		"user_location":"London"
# 		}
# col_users.insert_one(user4)

# extract dan berry's id
# res = col_users.find_one({"user_name": {"$eq":"Dan Berry"}})

# Let's insert a new short film called WiNDUP. Let's assume that WiNDUP is Dan's favourite film!
# user_id = res["_id"]
# film1 = {
# 		"film_name=":"WinDUP",
# 		"film_type":"Animated Short Film",
# 		"film_year":"2021",
#     	"film_link":"https://youtu.be/efGqe1j3RNk",
#     	"film_user_id":ObjectId(user_id)
# 		}
# col_films.insert_one(film1)



# now create connection between the user and the films collection to see if any films are there with dan's id
# res = col_users.aggregate([
# 	{
# 		"$lookup": {
# 			"from": "films",
# 			"localField": "_id",
# 			"foreignField": "film_user_id",
# 			"as": "FILMS"
# 		}
# 	}
# ])
# # the aggregation function gives the documents of each user_id as FILMS, some of the users may not have their id in the films collection
# # so those who has, will be printed out
# for i in res:
# 	if len(i['FILMS']) != 0:
# 		pprint(i)




# Let's insert a new film for Dan. Again, we use Dan's _id as we did previously.
# res = col_users.find_one({"user_name": {"$eq":"Dan Berry"}})
# user_id = res["_id"]
# film2 = {
# 		"film_name=":"Here's the Plan",
# 		"film_type":"Animated Short Film",
# 		"film_year":"2017",
#     	"film_link":"https://youtu.be/5Zqmt1H35fs",
#     	"film_user_id":ObjectId(user_id)
# 		}
# client.MiniFilms.films.insert_one(film2)




    # Let's create a new pipeline for the next actions:

    #     Search for users and their favorite films
    #     User should be Londoners
    #     Users should be older than 40

# stage_user_and_movies = {
# 	"$lookup": {
# 		"from": "films",
# 		"localField": "_id",
# 		"foreignField": "film_user_id",
# 		"as": "DATA"
# 	}
# }
# stage_londoners = {
# 	"$match": {
# 		"user_location": "London"
# 	}
# }
# stage_older_than_40 = {
# 	"$match": {
# 		"user_age": {
# 			"$gt": 40
# 		}
# 	}
# }
# pipeline = [stage_user_and_movies, stage_londoners, stage_older_than_40]
# result = col_users.aggregate(pipeline)
# for user in result:
# 	pprint(user)




# Let's explore the use of the update method. The next scripts select and print a record, then update and print once more, so we can visually examine the update process.

# myQuery = { "user_name": "Dan Berry"}
# newValues = { "$set": { "user_location": "Bournemouth" } }

# res = col_users.find({"user_name": "Dan Berry"}, {"user_name": 1, "user_location": 1})
# for i in res:
# 	pprint(i)

# updated = col_users.update_many(myQuery, newValues)

# res = col_users.find({"user_name": "Dan Berry"}, {"user_name": 1, "user_location": 1})
# for i in res:
# 	pprint(i)

# print(updated.modified_count, "documents updated")



# As in SQL, we can run any kind of query, so let's use regular expressions to select doctors from a city starting with Bourne.

# myquery = { "user_location": { "$regex": "^Bourne" } }
# results = col_users.find(myquery)
# for user in results:
#   print(user)



# Let's delete our user!

myquery = { "user_name": "Dan Berry"}

x = col_users.delete_many(myquery)

res = col_users.find()
for i in res:
  print(i)



# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)