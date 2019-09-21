import re

def is_username_valid(str):
	check=False
	x = re.findall("\W", str)
	y = re.findall("[a-z]", str)
	z=re.findall("[A-Z0-9]",str)
	if (len(y) >0 and (len(str) >=5 and len(str) <=9) and len(x)==0 and len(z)==0):
	  	check=True
	else:
		check=False

	print("username",str," = ",check)
def is_password_valid(str):
	check=False
	x = re.findall("[@]", str)
	y = re.findall("[A-Z]", str)
	z = re.findall("[0-9]", str)
	a=len(y)
	b=len(z)
	

	if (len(x) ==1 and a >=1 and b>=1 and len(str) ==10):
		check=True
	else:
		check=False
	
	print("password ",str," = ",check)

is_username_valid("@wakwaw")
is_username_valid("poEtri")
is_username_valid("tiara")
is_password_valid("p@ssW0rd99")
is_password_valid("C0d3YourFuture#")




