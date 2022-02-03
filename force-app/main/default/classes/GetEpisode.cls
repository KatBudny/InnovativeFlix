public with sharing class GetEpisode {
    @AuraEnabled
    public static List<Episode__c> GetEpisodeID(string recordId) {
        return [SELECT Id, Name, Season__c, Episode_Number__c from Episode__c where Series__c= :recordId];
    }

    public static List<Episode__c> GetEpisodeDetails() {

        //TODO: kwerenda
        return [SELECT Name from Episode__c];
    }
}