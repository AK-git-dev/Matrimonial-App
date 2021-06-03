import Address from "./address.schema";
import BlockedUsers from "./blockedUser.schema";
import Books from "./books.schema";
import Caste from "./caste.schema";
import UploadedDocument from "./documents.schema";
import Education from "./education.schema";
import FavouritePerson from "./favouritePerson.schema";
import Hobby from "./hobbies.schema";
import Languages from "./languages.schema";
import LifeStyle from "./lifeStyle.schema";
import Message from "./messages.schema";
import Movie from "./movies.schema";
import Occupation from "./occupation.schema";
import PeopleWhoViewedYou from "./peopleViewedYou.schema";
import PersonWhoFavouritedHimself from "./personWhoFavoriteYou.schema";
import PrivacySetting from "./privacySetting.schema";
import ProfilPicture from "./profilePicture.schema";
import RequestAccepted from "./requestAccepted.schema";
import RequestSend from "./requestSend.schema";
import Song from "./songs.schema";
import TrustScore from "./trustScore.schema";
import User from "./user.schema";
import VaccationDestination from "./vaccationDestination.schema";
import RefreshToken from "./refreshToken.schema";
import RelativeContact from "./relative-contacts.schema";
import FamilyDetails from "./family-details.schema";
import PrefferedPartnerChoice from "./preffered-partner.schema";
import PrefferedPartnerLanguages from "./prefferedPartner-languages.schema";
import MotherTongue from "./motherTongue.schema";

/** Will configure the association Mappings (1:N) / (M:N) / (N:1)  */
function buildAssociationsBetweenSchemas() {
    User.hasMany (Education);
    User.hasOne (PrefferedPartnerChoice);
    User.hasOne (Address);
    User.hasOne (FamilyDetails);
    User.hasMany (RelativeContact);
    User.hasMany (TrustScore);
    User.hasMany (FavouritePerson);
    User.hasMany (PersonWhoFavouritedHimself);
    User.hasOne (LifeStyle);
    User.hasMany (ProfilPicture);
    User.hasOne (Occupation);
    User.hasMany (PeopleWhoViewedYou);
    User.hasMany (RequestSend);
    User.hasMany (RequestAccepted);
    User.hasMany (Message);
    User.hasMany (BlockedUsers);
    User.hasOne (UploadedDocument);
    User.hasOne (Caste);
    RelativeContact.hasOne (PrivacySetting);
    User.hasOne (MotherTongue);

    Languages.belongsToMany (PrefferedPartnerChoice , {
        as :"prefferedMotherTounge" ,
        through :PrefferedPartnerLanguages ,
    });

    PrefferedPartnerChoice.hasOne (PrefferedPartnerLanguages);

    LifeStyle.hasMany (Movie , {as :"favouriteMovies"});
    LifeStyle.hasMany (Books , {as :"favouriteBooks"});
    LifeStyle.hasMany (Song , {as :"favouriteSongs"});
    LifeStyle.hasMany (Hobby);
    LifeStyle.hasMany (VaccationDestination , {as :"favoriteDestinationPlaces"});
    LifeStyle.belongsTo (PrivacySetting);
    LifeStyle.hasMany (Languages , {as :"languagesCanSpeak"});

    Movie.belongsToMany (LifeStyle , {through :'moviesLifestyles'});
    VaccationDestination.belongsToMany (LifeStyle , {through :'vaccationLifestyles'});
    Languages.belongsToMany (LifeStyle , {through :"vaccationLanguages"});

    Education.belongsTo (User);
}

/** Export Schema from index.ts file */

const Schema = {
    User ,
    Education ,
    Address ,
    MotherTongue ,
    TrustScore ,
    Caste ,
    UploadedDocument ,
    FavouritePerson ,
    LifeStyle ,
    Song ,
    PrefferedPartnerChoice ,
    Occupation ,
    RelativeContact ,
    PeopleWhoViewedYou ,
    Books ,
    VaccationDestination ,
    RefreshToken ,
    FamilyDetails ,
    Languages ,
    PrivacySetting ,
    ProfilPicture ,
    Movie ,
    PersonWhoFavouritedHimself ,
    RequestAccepted ,
    RequestSend ,
    BlockedUsers ,
    PrefferedPartnerLanguages ,
};

export {Schema , buildAssociationsBetweenSchemas};
