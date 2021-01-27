from apps.memoria.models import MemAno, MemMes
import math
import numpy as np

def takeTemMin(elem):
    return elem[4]

def takeTemMax(elem):
    return elem[3]

def takePrecipitacion(elem):
    return elem[5]

def temMaxima(datos):
    temMax = datos
    temMax.sort
    return temMax[len(datos)-1]

def temMinima(datos):
    temMax = datos
    temMax.sort
    return temMax[0]

def funcion_percentil(datos, percentil):
      mayores = datos
      mayores.sort()
      n = len(mayores)
      i = n * percentil
      if(i % 1 == 0):
          p = (mayores[int(i)] + mayores[int(i-1)])/2
      else:
          p = mayores[math.ceil(i-1)]
      return p

def funcion_percentil_95(datos, percentil):
      mayores = []
      for x in datos:
          if(x >= 1):
              mayores.append(x)
      mayores.sort()
      n = len(mayores)
      i = n * percentil
      if(i % 1 == 0):
          p = (mayores[int(i)] + mayores[int(i-1)])/2
      else:
          p = mayores[math.ceil(i-1)]
      return p

def atipicoInferior(aI, datos):
    cont = 0
    for x in datos:
        if(x < aI):
            cont += 1
    return cont

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
    if(len(existeAno) == 0):
        return ano.codigoano
    else:
        return existeAno[0].codigoano

def funcion_cdd(precipitacionserie, largoExcel, cddCount, ciclo):
    if( float(precipitacionserie) < 1):
         cddCount[0] += 1
    if(float(precipitacionserie) >= 1 or ciclo == largoExcel):
         if(cddCount[1] < cddCount[0]):
             cddCount[1] = cddCount[0]
         cddCount[0] = 0
    return cddCount

def funcion_csdi(temperaturaminserie, largoExcel, csdiCount, ciclo, percentil_10):
    if( float(temperaturaminserie) < percentil_10):
         csdiCount[0] += 1
    if(float(temperaturaminserie) >= percentil_10 or ciclo == largoExcel):
         if(csdiCount[1] < csdiCount[0]):
             csdiCount[1] = csdiCount[0]
         csdiCount[0] = 0
    return csdiCount

def funcion_cwd(precipitacionserie, largoExcel, cwdCount, ciclo):
    if( float(precipitacionserie) >= 1):
         cwdCount[0] += 1
    if(float(precipitacionserie) < 1 or ciclo == largoExcel):
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

def funcion_gls(temMedia, largoExcel, glsCount, ciclo):
    if( float(temMedia) < 5):
         glsCount[0] += 1
    if(float(temMedia) >= 5 or ciclo == largoExcel):
         if(glsCount[1] < glsCount[0]):
             glsCount[1] = glsCount[0]
         glsCount[0] = 0
    return glsCount

def funcion_gls1(temMedia, largoExcel, gls1Count, ciclo):
    if( float(temMedia) > 5):
         gls1Count[0] += 1
    if(float(temMedia) <= 5 or ciclo == largoExcel):
         if(gls1Count[1] < gls1Count[0]):
             gls1Count[1] = gls1Count[0]
         gls1Count[0] = 0
    return gls1Count

def funcion_id0(temMaxima, id0):
    if(temMaxima < 0):
        id0 += 1
    return id0

def funcion_prcptot(precipitacion, prcptot):
    if(precipitacion >= 1):
        prcptot += precipitacion
    return prcptot

def funcion_r10mm(precipitacion, r10mm):
    if(precipitacion >= 10):
        r10mm += 1
    return r10mm

def funcion_r20mm(precipitacion, r20mm):
    if(precipitacion >= 20):
        r20mm += 1
    return r20mm

def funcion_r95p(precipitacion, r95p, percentil95):
    if(precipitacion > percentil95):
        r95p += precipitacion
    return r95p

def funcion_r99p(precipitacion, r99p, percentil99):
    if(precipitacion > percentil99):
        r99p += precipitacion
    return r99p

def funcion_r50mm(precipitacion, r50mm):
    if(precipitacion >= 50):
        r50mm += 1
    return r50mm

def funcion_rx1day(datos, largo):
    datos.sort(key = takePrecipitacion)
    return datos[largo-1][5]

def funcion_rx5day(precipitacion, rx5day): 
    ciclo = 0
    largo = len(precipitacion) 
    for x in precipitacion:
        if(ciclo+4 != largo-1):
            suma = precipitacion[ciclo][5] + precipitacion[ciclo+1][5] + precipitacion[ciclo+2][5] 
            + precipitacion[ciclo+3][5] + precipitacion[ciclo+4][5]
            if(rx5day < suma):
                rx5day = suma
        else: 
            break
        ciclo += 1
    return rx5day

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
    datos.sort(key = takeTemMin)
    return datos[0][4] 

def funcion_txn(datos):
    datos.sort(key = takeTemMax)
    return datos[0][3]

def funcion_tr20(temMin, largoExcel, tr20Count, ciclo):
    if( float(temMin) > 20):
         tr20Count[0] += 1
    return tr20Count

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
    datos.sort(key = takeTemMin)
    return datos[len(datos)-1][4] 

def funcion_txx(datos):
    datos.sort(key = takeTemMax)
    return datos[len(datos)-1][3]

def funcion_wsdi(percentil_90, temMax, wsdi):
    if(percentil_90 < temMax):
        wsdi[0] += 1
    elif(percentil_90 > temMax and wsdi[0] != 6):
        wsdi[0] = 0
    if(wsdi[0] >= 6):
        wsdi[1] += wsdi[0]
        wsdi[0] = 0
    return wsdi