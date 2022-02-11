public with sharing class GetEpisode {   

    @AuraEnabled
    public static String GetEpisodeList(string recordId) {   
        List<Episode__c> allEpisodes = [SELECT Id, Name, Season__c, Episode_Number__c from Episode__c where Series__c= :recordId order by Season__c, Episode_Number__c];     
        List<Decimal> seasons = new List<Decimal>();
        List<seasonWrapper> seasonWrap = new List<seasonWrapper>();

        for(Episode__c e: allEpisodes){
            if (!seasons.contains(e.Season__c))
            {
                seasons.add(e.Season__c);
            }
        }

        //sezony dobrze pobiera
        System.debug('sezony '+seasons);
        
        for(Decimal s: seasons){
            List <Episode__c> wrapEpisodes = new List <Episode__c>();
            for(Episode__c e: allEpisodes){
                if(e.Season__c == s){
                    wrapEpisodes.add(e);
                }
            }
            seasonWrapper wrappedSeason = new seasonWrapper('Season '+String.valueOf(s), wrapEpisodes);
            seasonWrap.add(wrappedSeason);
        }
        String jsonEpisodes = JSON.serialize(seasonWrap);
        system.debug(jsonEpisodes);
        return jsonEpisodes;
    }
    private class seasonWrapper{
        private String season;
        private List<Episode__c> episodes;

        seasonWrapper( String season, List<Episode__c> episodes){
            this.season = season;
            this.episodes = episodes;
        }
    }
        @AuraEnabled
    public static Episode__c GetEpisodeDetails(string recordId) {
        return [SELECT Id, Name, Season__c, Episode_Number__c from Episode__c where Id= :recordId];  
    }
} 