public with sharing class GetSeries {
    @AuraEnabled
    public static List<Series__c> GetSeriesList() {
        return [SELECT Id, Name from Series__c order by Name];
    }

    @AuraEnabled
    public static Series__c GetSeriesDetails(string recordId) {
        return [SELECT Id, Name, Genre__c,Trailer_URL__c,Description__c, Logo_URL__c, (SELECT Id, Name, Score__c, Score_Description__c from Reviews__r) from Series__c where Id= :recordId];  
    }

    @AuraEnabled
    public static List<Review__c>  GetReviewDetails(string recordId) {
        return [SELECT Id, Name, Score__c, Score_Description__c from Review__c where Series__c= :recordId];  
    }

}