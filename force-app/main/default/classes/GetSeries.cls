public with sharing class GetSeries {
    @AuraEnabled(cacheable=true)
    public static List<Series__c> GetSeriesList() {
        system.debug('id użytkownika'+ UserInfo.getUserId());
        return [SELECT Id, Name from Series__c];
    }

    @AuraEnabled
    public static Series__c GetSeriesDetails(string recordId) {
        return [SELECT Id, Name, Genre__c,Trailer_URL__c,Description__c, Logo_URL__c from Series__c where Id= :recordId];  
    }
}