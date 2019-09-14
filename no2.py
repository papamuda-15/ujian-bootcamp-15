import re

def is_username_valid(str):
	check=False
	x = re.findall("\A@", str)
	y = re.findall("\w", str)
	if (x):
	  	check=False
	elif ((y) and (len(str) >5 and len(str) <=9)):
	  check=True
	print("username",str," = ",check)
def is_password_valid(str):
	check=False
	x = re.findall("[@]", str)
	y = re.findall("[A-Z]", str)
	z = re.findall("[0-9]", str)
	a=len(y)
	b=len(z)
	if (len(x) ==1 and a ==1 and b==1):
		check=True
	else:
		check=False
	
	print("password ",str," = ",check)

is_username_valid("@sony")
is_username_valid("Ayu99v")
is_password_valid("p@ssW0rd#")
is_password_valid("C0d3YourFuture#")
