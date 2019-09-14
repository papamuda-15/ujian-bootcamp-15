import random
import string
def randomString(n):
    letters = string.ascii_lowercase+string.digits
    i = 1
    while i <=n:
        a=''.join(random.choice(letters) for x in range(30))
        print(a)
        i +=1

randomString(3)