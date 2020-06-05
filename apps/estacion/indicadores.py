from apps.memoria.models import MemAno, MemMes
import math

def funcion_percentil_10(datos):
      datos2 = datos.sort('temperaturaminserie')
      n = len(datos2)
      i = n * 0.1
      if(i % 1 == 0):
          p = (datos2['temperaturaminserie'][int(i)] + datos2['temperaturaminserie'][int(i-1)])/2
          return p
      else:
          return datos2['temperaturaminserie'][math.ceil(i)]

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