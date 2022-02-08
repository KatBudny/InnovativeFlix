public with sharing class GetEpisode {

    List<Episode__c> allEpisodes = [SELECT Id, Name, Season__c, Episode_Number__c from Episode__c where Series__c= :recordId order by Season__c, Episode_Number__c];

    @AuraEnabled
    public static String GetEpisodeList(string recordId) {        
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
            seasonWrapper wrappedSeason = new seasonWrapper(String.valueOf(s), wrapEpisodes);
            seasonWrap.add(wrappedSeason);
        }
        String JSONEpisodes = JSON.serialize(seasonWrap);
        system.debug(JSONEpisodes);
        return JSONEpisodes;
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

        for(Episode e : allEpisodes){
            if (e.Id = recordId) {
                return e;                
            }
        }
    }

} 