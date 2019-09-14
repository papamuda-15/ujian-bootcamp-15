import re

str = "@sony"

#Check if the string starts with "The":

x = re.findall("\A@", str)

print(x)

if (x):
  print("Yes, there is a match!")
else:
  print("No match")
