from easysnmp import Session
import sqlite3
import pandas as pd
from datetime import datetime
import threading
import requests


db_path = "/home/jdceron/projects/network_monitoring/NM_DB.db"
snmp_community = 'public'



############################################################################################################# 


def freewaveSnmpGET(IP, ID):

    OID_list = ['.1.3.6.1.4.1.29956.3.1.1.1.1.2.1',
    '.1.3.6.1.4.1.29956.3.1.1.1.1.3.1',
    '.1.3.6.1.4.1.29956.3.1.1.1.1.4.1',
    '.1.3.6.1.4.1.29956.3.1.1.1.1.5.1',
    '.1.3.6.1.4.1.29956.3.1.1.1.1.6.1',
    '.1.3.6.1.4.1.29956.3.1.1.1.1.7.1',
    '.1.3.6.1.4.1.29956.3.1.1.1.1.8.1',
    '.1.3.6.1.4.1.29956.3.1.1.1.1.9.1',
    '.1.3.6.1.4.1.29956.3.1.1.1.1.10.1',
#    '.1.3.6.1.4.1.29956.3.1.1.1.1.11.1',
    '.1.3.6.1.4.1.29956.3.1.1.1.1.12.1',
    '.1.3.6.1.4.1.29956.3.1.1.1.1.13.1',
    '.1.3.6.1.4.1.29956.3.1.1.1.1.14.1',
    '.1.3.6.1.4.1.29956.3.1.1.1.1.15.1',
    '.1.3.6.1.4.1.29956.3.1.1.1.1.16.1',
    '.1.3.6.1.4.1.29956.3.1.1.1.1.17.1',
    '.1.3.6.1.4.1.29956.3.1.1.1.1.18.1',
    '.1.3.6.1.4.1.29956.3.1.1.1.1.19.1']


    # Create an SNMP session to be used for all our requests
    session = Session(hostname=IP, community=snmp_community, version=1, timeout=3, retries=2)

    reading = []
    currentDateAndTime = datetime.now()
    date = str(pd.to_datetime(currentDateAndTime))
    reading.append(date)

    try:
        response = (session.get(OID_list))

        for item in response:
            reading.append(item.value)

    except:

        reading.extend(['NULL','NULL','NULL','NULL','NULL','NULL','NULL','NULL','NULL','NULL','NULL','NULL','NULL','NULL','NULL','NULL','NULL'])
        #saveAlert(ID, "Sin conexion", 3, 0, date)

    reading.append(ID)

    return reading


def insertFreewaveData(freewave_data):

    freewave_data = str(freewave_data).replace("[", "(").replace("]", ")") # convert list to string
    freewave_data = freewave_data[1:-1]
    
    try:
        with sqlite3.connect(db_path) as sql_con:
            cursor = sql_con.cursor()

            sqlite_insert_query = """INSERT INTO freewave_reading
                                                    (date,
                                                    signal,
                                                    noise,
                                                    supply_voltage,
                                                    rx_rate,
                                                    reflected_power,
                                                    temperature,
                                                    range,
                                                    tx_rate,
                                                    sn_delta,
                                                    connected_to,
                                                    upstream_signal,
                                                    upstream_noise,
                                                    disconnect_count,
                                                    packet_rx_count,
                                                    packet_tx_count,
                                                    packet_dropped_count,
                                                    packet_bad_count,
                                                    ID) 

                                            VALUES """ + freewave_data


            cursor.execute(sqlite_insert_query)
            sql_con.commit()
            cursor.close()

    except Exception as ex:
        print(ex)
        
        
#################################################################################################################


        


################################################## MAIN loop ####################################################

freewave_data = []

def get_freewave_data(freewave_df):

    for index, row in freewave_df.iterrows():
        
        ID = row.ID
        IP = row.IP       
        reading = freewaveSnmpGET(IP, ID)
        print("freewave: {}".format(IP))
        print(reading)
        freewave_data.append(reading)

   
    
# Retrieve all IP addresses 
try:
    
    with sqlite3.connect(db_path) as sql_con:
        
        devices_df = pd.read_sql("SELECT ID, IP, type FROM device WHERE type = 'Freewave' ORDER by type", sql_con)
        
    sql_con.close()
        
except Exception as ex:
    print(ex)


freewave_df = devices_df[devices_df["type"]=="Freewave"]

thread_freewave = threading.Thread(target=get_freewave_data, args=(freewave_df,))

# Start the threads
thread_freewave.start()


thread_freewave.join()

print("a bd")
insertFreewaveData(freewave_data)