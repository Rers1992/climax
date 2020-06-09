from apps.memoria.models import MemAno, MemMes
import math

def funcion_percentil(datos, percentil, columna):
      datos2 = datos.sort(columna)
      n = len(datos2)
      i = n * percentil
      if(i % 1 == 0):
          p = (datos2[columna][int(i)] + datos2[columna][int(i-1)])/2
          return p
      else:
          return datos2[columna][math.ceil(i-1)]

def anos_meses(data2):
    existeAno = MemAno.objects.filter(ano = data2[0])
    existeMes = []
    if(len(existeAno) > 0):
            existeMes = MemMes.objects.filter(codigoano = existeAno[0].codigoano, nombremes= data2[1])
    if(len(existeAno) == 0):
        ano = MemAno(ano=data2[0])
        ano.save()
        if(len(existeMes) == 0):
            mes = MemMes(codigoano = MemAno.objects.get(codigoano=ano.codigoano), nombremes= data2[1])
            mes.save()
    else:
        if(len(existeMes) == 0):
            mes = MemMes(codigoano = MemAno.objects.get(codigoano=existeAno[0].codigoano), nombremes= data2[1])
            mes.save()

def funcion_cdd(precipitacionserie, largoExcel, cddCount, ciclo):
    if( float(precipitacionserie) < 1 and ciclo != largoExcel):
         cddCount[0] += 1
         return cddCount
    if(float(precipitacionserie) >= 1 or ciclo == largoExcel):
         if( float(precipitacionserie) < 1):
             cddCount[0] += 1
         if(cddCount[1] < cddCount[0]):
             cddCount[1] = cddCount[0]
         cddCount[0] = 0
         return cddCount

def funcion_csdi(temperaturaminserie, largoExcel, csdiCount, ciclo, percentil_10):
    if( float(temperaturaminserie) < percentil_10 and ciclo != largoExcel):
         csdiCount[0] += 1
         return csdiCount
    if(float(temperaturaminserie) >= percentil_10 or ciclo == largoExcel):
         if( float(temperaturaminserie) < percentil_10):
             csdiCount[0] += 1
         if(csdiCount[1] < csdiCount[0]):
             csdiCount[1] = csdiCount[0]
         csdiCount[0] = 0
         return csdiCount

def funcion_cwd(precipitacionserie, largoExcel, cwdCount, ciclo):
    if( float(precipitacionserie) >= 1 and ciclo != largoExcel):
         cwdCount[0] += 1
         return cwdCount
    if(float(precipitacionserie) < 1 or ciclo == largoExcel):
         if( float(precipitacionserie) >= 1):
             cwdCount[0] += 1
         if(cwdCount[1] < cwdCount[0]):
             cwdCount[1] = cwdCount[0]
         cwdCount[0] = 0
         return cwdCount

def funcion_dtr(temperaturasMaxMin, temMaxima, temMinima):
    temperaturasMaxMin[0] +=  temMaxima
    temperaturasMaxMin[1] +=  temMinima
    return temperaturasMaxMin

def funcion_fd0(temperaturaMin, fd):
    if(temperaturaMin < 0):
        fd += 1
    return fd

def funcion_id0(temMaxima, id0):
    if(temMaxima < 0):
        id0 += 1
    return id0

def funcion_prcptot(precipitacion,prcptot):
    if(precipitacion >= 1):
        prcptot += precipitacion
    return prcptot

def funcion_r95p(precipitacion, r95p, percentil95):
    if(precipitacion > percentil95):
        r95p += precipitacion
    return r95p

def funcion_r99p(precipitacion, r99p, percentil99):
    if(precipitacion > percentil99):
        r99p += precipitacion
    return r99p

def funcion_rx1day(datos):
    datos.sort('precipitacionserie')
    return datos['precipitacionserie'][0]

def funcion_sdii(precipitacion, sdii):
    if(precipitacion >= 1):
        sdii[0] += 1
        sdii[1] += precipitacion
    return sdii

def funcion_su25(temMaxima, su25):
    if(temMaxima > 25):
        su25 += 1
    return su25

def funcion_tn10p(percentil_10, temMinima, ciclo, largo, tn10p):
    if(temMinima < percentil_10 and ciclo != largo):
        tn10p += 1
    elif(ciclo == largo):
        if(temMinima < percentil_10):
            tn10p += 1
        tn10p = (tn10p * 100)/largo
    return tn10p

def funcion_tn90p(percentil_90, temMinima, ciclo, largo, tn90p):
    if(temMinima > percentil_90 and ciclo != largo):
        tn90p += 1
    elif(ciclo == largo):
        if(temMinima > percentil_90):
            tn90p += 1
        tn90p = (tn90p * 100)/largo
    return tn90p

def funcion_tnn(datos):
    datos2= datos.sort('temperaturaminserie')
    return datos2['temperaturaminserie'][0] 

def funcion_txn(datos):
    datos2= datos.sort('temperaturamaxserie')
    return datos2['temperaturamaxserie'][0]

def funcion_tx10p(percentil_10, temMaxima, ciclo, largo, tx10p):
    if(temMaxima < percentil_10 and ciclo != largo):
        tx10p += 1
    elif(ciclo == largo):
        if(temMaxima < percentil_10):
            tx10p += 1
        tx10p = (tx10p * 100)/largo
    return tx10p

def funcion_tx90p(percentil_90, temMaxima, ciclo, largo, tx90p):
    if(temMaxima > percentil_90 and ciclo != largo):
        tx90p += 1
    elif(ciclo == largo):
        if(temMaxima > percentil_90):
            tx90p += 1
        tx90p = (tx90p * 100)/largo
    return tx90p

def funcion_tnx(datos):
    datos2= datos.sort('temperaturaminserie')
    return datos2['temperaturaminserie'][len(datos2)-1] 

def funcion_txx(datos):
    datos2= datos.sort('temperaturamaxserie')
    return datos2['temperaturamaxserie'][len(datos2)-1]

def funcion_wsdi(percentil_90, temMax, wsdi):
    if(percentil_90 < temMax):
        wsdi[0] += 1
    elif(percentil_90 > temMax and wsdi[0] != 6):
        wsdi[0] = 0
    if(wsdi[0] == 6):
        wsdi[1] += 1
        wsdi[0] = 0
    return wsdi