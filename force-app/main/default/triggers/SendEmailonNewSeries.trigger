trigger SendEmailonNewSeries on Series__c (after insert) {
    if(Trigger.isAfter){
        if(Trigger.isInsert){

            String contact = 'pogromcaoscypa@gmail.com';
            List<String> newSeriesIDs = new List<String>();
            for(Series__c s : Trigger.new){
                newSeriesIDs.add(s.Id);
            }

            SendEmail.sendEmail(contact, newSeriesIDs);

        }
    }
}