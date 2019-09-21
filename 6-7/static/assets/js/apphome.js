var home=angular.module("homeApp",[]);
home.controller("homeController",function($scope,$http) {
    var tgl=new Date();
    var hari=["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
    var bulan=["Januari","Selasa","Rabu","Kamis","Jumat","Sabtu"];
    var bayar=document.getElementById("bayar");
    var totalsemua;
    var kembalian;
    var nomor;
    var btnselesai=document.getElementById("btn-selesai");
    var id=localStorage.getItem("id_akun");
    if(id ==="")
    {
        swal({
            text:"Silakan Login Dulu !!!",
            icon:"warning"
        });
        setInterval(function()
        {
            window.location.href="../../index.php";
        },2000)
    }
    $scope.hari=hari[tgl.getDay()];
    $scope.jam=tgl.getHours()+":"+tgl.getMinutes();
    $scope.tgl=tgl.getDate()+" "+bulan[tgl.getMonth()]+" "+tgl.getFullYear();
    $http({
        method: "POST",
        url: "http://localhost/server%20mgm/controller/Cdetail_transaksi.php?s=totalLaba",
    }).then(function (res) {
        $scope.totalsemua=res.data.jumlah;
    });
    $scope.tampilAkun=function()
    {
        $http({
            method:"POST",
            url   :"http://localhost/server%20mgm/controller/Cdetail_transaksi.php?s=checkTransaksi",
        }).then(function(res)
        {
                if(res.data.count >0) {
                    $scope.nomor_registrasi = res.data.data.nomor_registrasi;
                    $scope.nomor_belanja = res.data.data.nomor_belanja;
                    $scope.nomor_transaksi = res.data.data.nomor_transaksi;
                   $scope.tanggal=res.data.data.tgl;


                    $scope.nama = res.data.data.nama;
                    $scope.nomor_hp = res.data.data.nomor_hp;
                    nomor = res.data.data.nomor_belanja;
                    if (nomor === undefined) {
                        nomor = '';
                    }
                    else {
                        $http({
                            method: "POST",
                            url: "http://localhost/server%20mgm/controller/Ctransaksi.php?s=check2",
                            data: {nomor_belanja: nomor}
                        }).then(function (res) {
                            var total = 0;
                            $scope.data = res.data;
                            for (var i = 0; i < $scope.data.length; i++) {
                                var product = $scope.data[i];
                                total += (product.harga_jual * product.jumlah);
                            }

                            $scope.total = total;
                            $scope.diskon = total * 0.1;
                            $scope.totalall = (total) - (total * 0.1);
                            totalsemua = (total) - (total * 0.1);
                        });
                    }
                }
                else
                {
                   $scope.data="";
                }
        });
    }
    $scope.tampilDetailTransaksi=function()
    {
        $http({
            method: "POST",
            url: "http://localhost/server%20mgm/controller/Cdetail_transaksi.php?s=showDetailTransaksi",
        }).then(function (res) {
            var total=0;
            $scope.data2=res.data;

            for (var i = 0; i < $scope.data2.length; i++) {
                var product = $scope.data2[i];
                total +=0+product.laba;


            }
        });
    }

    $scope.tampilDetailTransaksi();



    setInterval(function()
    {

           $scope.tampilAkun();
    },1000);
    function formatRupiah(angka, prefix)
    {
        var number_string = angka.replace(/[^,\d]/g, '').toString(),
            split    = number_string.split(','),
            sisa     = split[0].length % 3,
            rupiah     = split[0].substr(0, sisa),
            ribuan     = split[0].substr(sisa).match(/\d{3}/gi);

        if (ribuan) {
            separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }

        rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
        return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
    }
    bayar.addEventListener("keyup",function()
    {

        bayar.value=formatRupiah(this.value, 'Rp. ')
        var number = bayar.value.replace(/[Rp.,]+/g,"");
        console.log(number)
        kembalian=number-totalsemua;
        var formatkembalian=numeral(kembalian).format(0,0)
        if(kembalian <0)
        {
            kembalian=0;
        }
        else
        {
            kembalian=kembalian;
        }
         document.getElementById("kembalian").innerText="Kembalian : "+"Rp. "+formatkembalian
         if(number >totalsemua)
         {
             document.getElementById("status").style.color="blue";
             document.getElementById("status").innerText="Status Bayar : Uang Pembayaran Cukup";

         }
         else if(number <totalsemua)
         {
             document.getElementById("status").innerText="Status Bayar : Uang Pembayaran Belum Cukup";
             document.getElementById("status").style.color="red";
         }
         else if(kembalian ===0) {
             document.getElementById("status").innerText="Status Bayar :";
             document.getElementById("status").style.color="black";
         }

    });

    btnselesai.addEventListener("click",function()
    {
        $http({
            method:"POST",
            url   :"http://localhost/server%20mgm/controller/Cdetail_transaksi.php?s=updateStatus",
            data  :{nomor_belanja:$scope.nomor_belanja,nomor_transaksi:$scope.nomor_transaksi}
        }).then(function(res)
        {
            var check=res.data.count;
            if(check >0)
            {
                swal({
                    text:"Transaksi Selesai",
                    icon:"success"
                });
                nomor=undefined;
                location.reload();

            }
            else
            {
                swal({
                    text:"Transaksi Gagal",
                    icon:"error"
                });
            }
        });
    });

});
