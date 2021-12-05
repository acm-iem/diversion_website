import sys
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import email.mime.application
import email
from jinja2 import Environment

#argv[1] receivers mail id
#argv[2] receivers name
#argv[3] reciever type

print('Second param:'+sys.argv[1]+'#')
print('Third param:'+sys.argv[2]+'#')
print('Third param:'+sys.argv[3]+'#')

if sys.argv[3] == "lead":
    text_lead = '''
          Hi {{name}},
          <br><br>
          We’re delighted to inform you that you’ve filled up the project registration form successfully.
          <br><br>
          DIVERSION 2022 is an event organized by ACM IEM Student Chapter which encourages participants to contribute in open-source.Participants can contribute to a  plethora of open-source projects in various fields including AI & ML, App development and Web development.We also have projects based on hardware-related domains like IoT and robotics.
          <br><br>
          Participants are free to compete with their  own project idea and we would be more than happy to help you achieve that. The only thing that must be in your idea is that it should be scalable so that more participants can work on it. The perks will include swags.
          <br><br>
          Our team is currently reviewing your project application and will be contacting you soon. Stay Tuned!
          <br><br>
          Let us join hands to celebrate this festival of Open Source contribution in it’s true spirit, in the open source event which lasts longer.
          <br><br>
          For any further queries, please contact :  acm@iemcal.com
          <br><br>
          Regards,
          <br><br>
          TEAM DIVERSION
          '''

    email_lead = MIMEText(
            Environment().from_string(text_lead).render(
                name = sys.argv[2]
            ), "html"
        )

    msg_alternative = MIMEMultipart('alternative')
    msg_alternative.attach(email_lead)

    filename='brochure.pdf'
    fp=open(filename,'rb')
    attachment = email.mime.application.MIMEApplication(fp.read(),_subtype="pdf")
    fp.close()

    attachment.add_header('Content-Disposition', 'attachment', filename='Brochure.pdf')

    msg_mixed = MIMEMultipart('mixed')
    msg_mixed.attach(msg_alternative)
    msg_mixed.attach(attachment)
    msg_mixed['From'] = 'Team Diversion 2022'
    msg_mixed['To'] = str(sys.argv[1])
    msg_mixed['Subject'] = "Thank you for registering for DIVERSION 2022"

    smtp_obj = smtplib.SMTP('smtp.gmail.com', 587)
    smtp_obj.ehlo()
    smtp_obj.starttls()
    smtp_obj.ehlo()
    smtp_obj.login('diversionteamiem@gmail.com', 'souvik@nonetwork666')
    smtp_obj.sendmail(msg_mixed['From'], sys.argv[1], msg_mixed.as_string())
    print('Lead mail sent')
    smtp_obj.quit()
    
if sys.argv[3] == "mentor":

    text_mentor = '''


          Hi {{name}},
          <br><br>
          We’re delighted to inform you that you’ve filled up the mentorship registration form successfully.
          <br><br>
          DIVERSION 2022 is an event organized by ACM IEM Student Chapter which encourages participants to contribute in open-source.Participants can contribute to a  plethora of open-source projects in various fields including AI & ML, App development and Web development.We also have projects based on hardware-related domains like IoT and robotics.
          <br><br>
          DIVERSION 2022 will have engaging speakers/workshops throughout the event to keep participants motivated about their applications as well as provide mentors to help with technical debugging. 
          <br><br>
          Mentors will prove to be crucial in providing important practical insights to all the participants as they contribute to various open-source projects.
          <br><br>
          Our team is currently reviewing your application and will be contacting you soon.
          <br><br>
          Let us join hands to celebrate this festival of Open Source contribution in it’s true spirit, in the open source event which lasts longer.
          <br><br>
          For any further queries, please contact :  acm@iemcal.com
          <br><br>
          Regards,
          <br><br>
          TEAM DIVERSION
          '''
    
    email_mentor = MIMEText(
            Environment().from_string(text_mentor).render(
                name = sys.argv[2]
            ), "html"
        )

    msg_alternative = MIMEMultipart('alternative')
    msg_alternative.attach(email_mentor)

    filename='brochure.pdf'
    fp=open(filename,'rb')
    attachment = email.mime.application.MIMEApplication(fp.read(),_subtype="pdf")
    fp.close()

    attachment.add_header('Content-Disposition', 'attachment', filename='Brochure.pdf')

    msg_mixed = MIMEMultipart('mixed')
    msg_mixed.attach(msg_alternative)
    msg_mixed.attach(attachment)
    msg_mixed['From'] = 'Team Diversion 2022'
    msg_mixed['To'] = str(sys.argv[1])
    msg_mixed['Subject'] = "Thank you for registering for DIVERSION 2022"

    smtp_obj = smtplib.SMTP('smtp.gmail.com', 587)
    smtp_obj.ehlo()
    smtp_obj.starttls()
    smtp_obj.ehlo()
    smtp_obj.login('diversionteamiem@gmail.com', 'souvik@nonetwork666')
    smtp_obj.sendmail(msg_mixed['From'], sys.argv[1], msg_mixed.as_string())
    print('Mentor mail sent')
    smtp_obj.quit()
