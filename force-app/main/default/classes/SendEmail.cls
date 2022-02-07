global abstract class SendEmail {

    global static void sendEmail(String contact, List<Id> newSeriesIDs){
        List<Series__c> newSeries = [SELECT Id, Name, Genre__c from Series__c where Id in :newSeriesIDs];    
        String mailBody = 'Hey! <br> We just added new series for your viewing pleasure. Please look foward to: <br>';
        for (Series__c s : newSeries){
            mailBody += s.Genre__c + ' series -  ' + s.Name +'<br>';
        }

        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();    
        mail.setToAddresses(new String[]{contact});  
        mail.setSenderDisplayName('Salesforce - InnovativeFlix');  
        mail.setSubject('New series you may like available!');  
        mail.setHtmlBody(mailBody);  
        Messaging.sendEmail(new Messaging.SingleEmailMessage[]{mail});  
    }  
}