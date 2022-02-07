public with sharing class GetSeries {
    @AuraEnabled(cacheable=true)
    public static List<Series__c> GetSeriesList() {
        system.debug('id użytkownika'+ UserInfo.getUserId());
        return [SELECT Id, Name from Series__c];
    }
}