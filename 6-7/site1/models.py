from django.db import models


class TblKategori(models.Model):
    salary = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tbl_kategori'


class TblNama(models.Model):
    nama = models.CharField(max_length=50, blank=True, null=True)
    id_work = models.IntegerField(blank=True, null=True)
    id_salary = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tbl_nama'


class TblWork(models.Model):
    nama = models.CharField(max_length=50, blank=True, null=True)
    id_salary = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tbl_work'
