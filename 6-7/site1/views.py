from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
from .models import TblNama,TblWork,TblKategori
from django.db import connection
import json
def beranda(request):

	return render(request,"index.html")
def tampildata(request):
	with connection.cursor() as cursor:
		cursor.execute("SELECT tbl_nama.id,tbl_nama.nama,tbl_work.nama,tbl_kategori.salary FROM tbl_nama"
		" INNER JOIN tbl_work ON tbl_nama.id_work=tbl_work.id "
		"INNER JOIN tbl_kategori ON tbl_nama.id_salary=tbl_kategori.ID")
		row = cursor.fetchall()
	x=list(row)
	return JsonResponse(x, safe=False)
def tampilwork(request):
	x=TblWork.objects.values()
	data=list(x)
	return JsonResponse(data, safe=False)

def tampilkategori(request):
	x=TblKategori.objects.values()
	data=list(x)
	return JsonResponse(data, safe=False)

def simpan(request):
	body_unicode = request.body.decode('utf-8')
	body = json.loads(body_unicode)
	x=TblNama(nama=body["nama"],
		id_work=body["id_work"],
		id_salary=body["id_salary"])
	x.save()
	return JsonResponse({"message":1})
def edit(request):
	body_unicode = request.body.decode('utf-8')
	body = json.loads(body_unicode)
	with connection.cursor() as cursor:
		cursor.execute("SELECT tbl_nama.id,tbl_nama.nama,tbl_work.nama,tbl_kategori.salary,"
		"tbl_nama.id_work,tbl_nama.id_salary FROM tbl_nama"
		" INNER JOIN tbl_work ON tbl_nama.id_work=tbl_work.id "
		"INNER JOIN tbl_kategori ON tbl_nama.id_salary=tbl_kategori.ID where tbl_nama.id = %s",[body['id']])
		row = cursor.fetchone()
	x=list(row)
	return JsonResponse(x, safe=False)
def perbarui(request):
	body_unicode=request.body.decode('utf-8')
	body = json.loads(body_unicode)
	k=TblNama.objects.filter(id=body['id']).update(id_work=body["id_work"],id_salary=body["id_salary"],nama=body["nama"])
	return JsonResponse({'message':k})
def hapus(request):
	body_unicode=request.body.decode('utf-8')
	body = json.loads(body_unicode)
	k=TblNama.objects.filter(id=body['id']).delete()
	return JsonResponse({'message':1})




	
