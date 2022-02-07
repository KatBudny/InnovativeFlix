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
            seasonWrapper wrappedSeason = new seasonWrapper(String.valueOf(s), wrapEpisodes);
            seasonWrap.add(wrappedSeason);
        }
        String JSONEpisodes = JSON.serialize(seasonWrap);
        system.debug(JSONEpisodes);
        return JSONEpisodes;
    }

    public static List<Episode__c> GetEpisodeDetails() {

        //TODO: kwerenda
        return [SELECT Name from Episode__c];
    }
    private class seasonWrapper{
        private String season;
        private List<Episode__c> episodes;

        seasonWrapper( String season, List<Episode__c> episodes){
            this.season = season;
            this.episodes = episodes;
        }
    }

} 