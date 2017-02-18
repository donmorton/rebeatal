import json


def main():
	with open('data.json') as data_file:
    		data = json.load(data_file)

   	print(data[0])

	encoded = data[0].decode("base64").encode("hex")
	print(encoded)
	a 
main()