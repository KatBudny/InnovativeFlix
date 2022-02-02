public with sharing class GetSeries {
    @AuraEnabled(cacheable=true)
    public static List<Series__c> GetSeriesList() {
        return [SELECT Id, Name from Series__c];
    }
}