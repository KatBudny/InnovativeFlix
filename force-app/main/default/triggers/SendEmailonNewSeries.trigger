trigger SendEmailonNewSeries on Series__c (after insert) {
    if(Trigger.isAfter){
        if(Trigger.isInsert){

            List<String> contact = new List<String>{'alt.tq-aq7wh89@yopmail.com', 'katbudny@gmail.com', 'katarzyna.budny@accenture.com'};
            List<String> newSeriesIDs = new List<String>();
            for(Series__c s : Trigger.new){
                newSeriesIDs.add(s.Id);
            }

            SendEmail.sendEmail(contact, newSeriesIDs);

        }
    }
}