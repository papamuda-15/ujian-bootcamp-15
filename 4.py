def fibo(batasawal,batasakhir):
	a, b , c= 0,1,0

	for i in range(batasawal):
		for j in range(batasakhir):
			print(a,' ',end='')
			c=a+b
			a=b
			b=c
		print()
fibo(3,4)
   