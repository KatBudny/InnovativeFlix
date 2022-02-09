global abstract class SendEmail {

    @future
    global static void sendEmail(List<String> contact, List<Id> newSeriesIDs){
        List<Series__c> newSeries = [SELECT Id, Name, Genre__c from Series__c where Id in :newSeriesIDs];    
        String mailBody = 'Hey! <br> We just added new series for your viewing pleasure. Please look foward to: <br>';
        for (Series__c s : newSeries){
            mailBody += s.Name +'<br>';
        }

        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();  
        
        mail.setToAddresses(contact);
        System.debug('adres '+contact);
       
        OrgWideEmailAddress[] owea = [select Id from OrgWideEmailAddress];
        if ( owea.size() > 0 ) {
            mail.setOrgWideEmailAddressId(owea.get(0).Id);
        }
        
         /* 
        OrgWideEmailAddress owea = new OrgWideEmailAddress();
                owea = [SELECT Id, Address, DisplayName FROM 
        OrgWideEmailAddress WHERE DisplayName='katbudny@gmail.com'];

        mail.setOrgWideEmailAddressId(owea.Id);
                */      
        //mail.setSenderDisplayName('Innovativeflix');
        mail.setSubject('New series you may like available!');  
        mail.setHtmlBody(mailBody); 
        System.debug('treść '+mailBody);
        List<Messaging.SendEmailResult> results = 
        Messaging.sendEmail(new Messaging.Email[] { mail });
            system.debug('Marcin chciał debuga tutaj. '+results);
            if (!results.get(0).isSuccess()) {
                System.StatusCode statusCode = results.get(0).getErrors()[0].getStatusCode();
                String errorMessage = results.get(0).getErrors()[0].getMessage();
            }
            else{
                system.debug('przeszło');
            }

    }  
}