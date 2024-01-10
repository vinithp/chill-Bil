# technology used

1. typeScript,
2. react js
3. mongodb

# planning

1. database is created for each type of price config, DBP,DAP,TMF,WC
2. config collection is created to group all the config and log collection is used to log the user action
3. we need to seperately add/delete the DBP,DAP,TMF,WC to their respected DB
4. after we will create config record by the above values
5. and to calculate the final bill, using the config record

# Guide

1. first we need to enter userName to get into app, userName is also used to log the user action, there is no auth for now
2. then enter the DBP,DAP,TMF,WC in price page
3. go to config page, where u will see all the prices added in price page based on the u can create config record, u need to seperately enable/disable the config in config page
4. then go the calculate page where you enter day,Km travled, time taken and waiting time, based on that you will get final bill
