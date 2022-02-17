global class batchInsert implements Database.Batchable<sObject> {
    
    global Database.QueryLocator start(Database.BatchableContext BC) {
        Id epiID = [SELECT Id
        FROM Series__c
        WHERE Name = '2137'][0].Id;
        System.debug(epiID);         
        String query = 'SELECT Id,Name, Series__c FROM Episode__c';         
        return Database.getQueryLocator(query);       
    }
     
    global void execute(Database.BatchableContext BC, List<Episode__c> scope) {
        System.debug('wchodzi w execute');
        List<Episode__c> epiList = new List<Episode__c>();
        Id epiID = [SELECT Id
        FROM Series__c
        WHERE Name = '2137'][0].Id;

        for (Integer i=1;i<2138;i++)
            {
                Episode__c e= new Episode__c(Name ='Franklin idzie po kremówkę '+i, Series__c = epiID, Season__c = 37, Episode_Number__c = i);
                epiList.add(e);         
            
            }
         
        try {
            system.debug('lista  '+epiList.size()+' rekordów');
            insert epiList;
            system.debug('przeszło '+epiList.size()+' rekordów');
            
         
         
        } catch(Exception e) {
            System.debug(e);
        }
         
    }        
    global void finish(Database.BatchableContext BC) {
        // execute any post-processing operations
        system.debug('koniec');
  }
}