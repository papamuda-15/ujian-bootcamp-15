  import json
def getBiodata():
	nama="Zayn"
	age=20
	adress="Alamat"
	hobbies=["SepakBola","Mengoding","Sepak Bola"]
	is_married=False
	list_school=[
	{
		"year_in":'9/14/2019',
		"year_out":'9/14/2025',
		"major":"null"
	}]
	skills={
	"level":[
"Beginner","Advanced","expert"
	]
	}
	interest_in_coding=True
	data={"nama":nama,"age":age,"adress":adress,"hobbies":hobbies,"list_school":list_school,"skills":skills,"interest_in_coding":interest_in_coding
	}

	return data

data=getBiodata()
jstr = json.dumps(data)
print(jstr)

