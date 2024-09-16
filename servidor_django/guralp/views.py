from django.http import JsonResponse

from .agenteChat import AgenteChat
from .agenteInclinometroGuralp import openGcf, graficaOriginal, getFigurasUnaTraza, getFigVariasTrazasUnificadas, getSubfoldersNames, getFilesNames, getAnomalias
#import agenteInclinometroGuralp as agenteIncGur
from django.shortcuts import render
from django.http import Http404
from django.views.decorators.csrf import csrf_exempt
import json

import spade
from spade import wait_until_finished
from spade.agent import Agent
from spade.behaviour import OneShotBehaviour
from spade.message import Message
from spade.template import Template

#rutaGcf = "D:/SGC/GCF/"
#rutaGcf = "X:/"
rutaGcf = "D:/Volcan-Project/gcf/"
subfolder = ""

@csrf_exempt
def fecha2Subfolders(request):

    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            selected_date = data.get('selectedDate')  # Usando get para manejar el caso en el que 'selectedDate' no esté presente
            #rutaGcf = "D:/SGC/GCF/" # Ruta local
            rutaGcf = "X:/" # Ruta en la red donde realmente están llegando los datos 
            partes = selected_date.split("-")  # Divide la cadena en partes usando el guion como separador
            anio = partes[0]
            mes = partes[1]
            rutaGcfFecha = rutaGcf + anio + "/" + mes + "/"
            print("showRuta: ", rutaGcfFecha)
            rutaGcf_Fecha = {'rutaGcfFecha': rutaGcfFecha}
            return JsonResponse(rutaGcf_Fecha) #subfoldersNames
        except json.JSONDecodeError:
            pass
    else:
        subfoldersNames={'message': 'Fecha procesada, NO POST...'}
        return JsonResponse(subfoldersNames)
        #raise Http404()
        
@csrf_exempt
def nombresArchivos(request):
    global subfolder
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            subfolder = data.get('selectedSubfolder') + "/" # Usando get para manejar el caso en el que 'selectedDate' no esté presente
            # print("subfolder", subfolder)
            filesNames = getFilesNames(subfolder)
            return JsonResponse(filesNames)
        except json.JSONDecodeError:
            pass
    else:
        nopost={'message': 'Nombres de archivos, NO POST...'}
        return JsonResponse(nopost)
    

@csrf_exempt
def trazas(request):
    global subfolder
    if request.method == 'POST': 
        try:
            data = json.loads(request.body)
            fileNamesSelected = data.get('fileNamesSelected')  # Usando get para manejar el caso en el que 'selectedDate' no esté presente
            print("fileNamesSelected: ", fileNamesSelected)
            listaDataTrazas = []
            for fileName in fileNamesSelected:
                subfolderTraza = subfolder + fileName
                # print("subfolderTraza ", subfolder)
                dataTrazas = openGcf(subfolderTraza)
                listaDataTrazas.append(dataTrazas)
            return JsonResponse(listaDataTrazas, safe=False) 
        except json.JSONDecodeError: 
            pass
    else:
        nopost={'message': 'Trazas generadas, NO POST...'}
        return JsonResponse(nopost)
    
@csrf_exempt
def anomalias(request): 
    
    global rutaGcf

    if request.method == 'POST': 
        try:
            data = json.loads(request.body)
            selected_date = data.get('selectedDate')  # Usando get para manejar el caso en el que 'selectedDate' no esté presente
            
            partes = selected_date.split("-")  # Divide la cadena en partes usando el guion como separador
            anio = partes[0]
            mes = partes[1]
            rutaGcfFecha = rutaGcf + anio + "/" + mes + "/"
            anomalias = getAnomalias(rutaGcfFecha)
            return JsonResponse(anomalias, safe=False) 
        except json.JSONDecodeError: 
            pass
    else:
        nopost={'message': 'Anomalías generadas, NO POST...'}
        return JsonResponse(nopost)
 
#__________________________________________________________________


def trazaIndependiente(request): 
    if request.method == 'POST':
        opcionSeleccionada = request.POST.get(
            'opciones')  # Obtén el valor seleccionado
        opc = {'opcionesView': opcionSeleccionada}
        return render(request, 'index.html', opc)

    archivoGcf = "./04010000.gcf"
    datos, titulo, fecha_inicio, saltos_segundos = openGcf(archivoGcf)
    fig = graficaOriginal(datos, titulo)
    trazaHtml = fig.to_html(full_html=False)
    trz = {'traza': trazaHtml}
    
    return render(request, 'index.html', trz)


def trazaAntes(request):
    
    # agIncGur = agenteIncGur.agenteInclinometroGuralp("guralp@magicbroccoli.de", "87065333")
    # await agIncGur.start(auto_register=True)
    
    ruta = "D:/SGC/GCF/"
    #ruta = "X:/"
    trazaHtml = ""
        
    # si accede por clic en boton o por link guralp
    if request.method == 'POST':
        
        sel = request.POST.get('opcionGrafica')
        opc = request.POST.get('tipoGrafica')  
        ntr = int(request.POST.get('ntr'))
        subfolder = request.POST.get('sltSubfolders') 
        
        fecha = request.POST.get('fecha')
        partes = fecha.split("-")  # Divide la cadena en partes usando el guion como separador
        anio = partes[0]
        mes = partes[1]
        ruta = ruta + anio + "/" + mes + "/"
        print("ruta", ruta)
        
        if sel == "individual":
            archivoGcf = "04010000.gcf"
            fig = getFigurasUnaTraza(archivoGcf)
            trazaHtml = fig.to_html(full_html=False)
        elif sel == "agrupada":
            if subfolder != None:
                ruta = ruta + subfolder + "/"
                fig = getFigVariasTrazasUnificadas(ruta, nf=ntr, sel=opc)
                trazaHtml = fig.to_html(full_html=False)
    
    else: # Carga los datos de entrada, cuando la pagina inica
        sel = "agrupada"
        ntr = 2
   
    context = {'traza': trazaHtml,
                'sel': sel,
                'ntr': ntr
              }
    
    #Comunicacion angente chat
    # agIncGur.InformBehav().run()
    
    # envío de mensaje al chat por websocket (FUNCION SINCRONA)
    # async_to_sync(channel_layer.group_send)('chat', {"type": "chat_message","message": "Dibujando Traza...","name": "GuralpAg"})
    # envío de mensaje al chat por websocket (FUNCION ASINCRONA)
    #await channel_layer.group_send('chat', {"type": "chat_message","message": "Dibujando Traza...","name": "GuralpAg"})
    
    return render(request, 'guralp.html', context)

def chat(request):
    # agChat = agenteChat.ReceiverAgent("ovsai@magicbroccoli.de", "87065333")
    # await agChat.start(auto_register=True)

    async def chatMessage():
        senderagent = AgenteChat("rxworld@deshalbfrei.org", "Lenuxinc2024*")
        await senderagent.start(auto_register=True)
        await spade.wait_until_finished(senderagent)
        #senderagent.start()
    print("Agents finished")

    
    spade.run(chatMessage())

    # return render(request, 'chat.html')