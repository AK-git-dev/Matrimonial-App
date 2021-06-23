import fakerStatic from "faker";
import { v4 } from "uuid";
import { Schema } from "../../database/schema";

// ~~~~~~~~~~~~~~~~~~~~~~~~ USER Generator ~~~~~~~~~~~~~~~~~~~~~~~

function dateOfBirthAgeGenerator(n: number) {
  const gen = [...Array(n)].map((x) => {
    const d = fakerStatic.date.between("1984-01-01", "1999-12-31");
    return {
      dob: d,
      age: new Date().getFullYear() - d.getFullYear(),
    };
  });

  return gen;
}

export async function fakeUsersDataGenerator(n: number) {
  const dd = dateOfBirthAgeGenerator(n);

  const fakeUsersData: {}[] = [...Array(n)].map((user, i) => ({
    id: v4(),
    fullname: fakerStatic.name.firstName() + " " + fakerStatic.name.lastName(),
    dateOfBirth: dd[i].dob,
    age: dd[i].age,
    gender: Math.floor(Math.random() * 10) > 5 ? "Male" : "Female",
    phoneNumber: fakerStatic.phone.phoneNumber(),
    email: fakerStatic.internet.email(),
    martialStatus: genMatrialState(),
    motherTongue: genLanguage(),
    isCasteBarrier: false,
    fathersName:
      fakerStatic.name.firstName() + " " + fakerStatic.name.lastName(),
    mothersName:
      fakerStatic.name.firstName() + " " + fakerStatic.name.lastName(),
  }));

  await Schema.User.bulkCreate([...fakeUsersData]);
}

function genMatrialState(): string {
  return Math.floor(Math.random() * 10) > 8
    ? "Marriage"
    : Math.floor(Math.random() * 10) > 3
    ? "Single"
    : "Divorced";
}

function genLanguage(): string {
  return Math.floor(Math.random() * 10) > 8
    ? "Bengali"
    : Math.floor(Math.random() * 10) > 3
    ? "Hindi"
    : "Tamil";
}

// ~~~~~~~~~~~~~~~~~~~~~~~~ USER Generator END ~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~~ USER ADDRESS ~~~~~~~~~~~~~~~~~~~~~~~

export async function fakeAddressGenerator(allUsers: any, n: number) {
  const addresses = [];

  for (const user of allUsers) {
    addresses.push({
      id: v4(),
      UserId: user.getDataValue("id"),
      address: fakerStatic.address.streetAddress(),
      city: fakerStatic.address.cityName(),
      district: fakerStatic.address.cityName(),
      country: fakerStatic.address.country(),
      zipCode: fakerStatic.address.zipCode(),
    });
  }

  await Schema.Address.bulkCreate([...addresses]);
}

// ~~~~~~~~~~~~~~~~~~~~~~~~ USER ADDRESS END ~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~~ USER CASTE ~~~~~~~~~~~~~~~~~~~~~~~

export async function casteGenerator(allUsers: any, n: number) {
  const castes = [];

  for (const user of allUsers) {
    const probablity = Math.floor(Math.random() * n);
    if (probablity > 8) {
      castes.push({
        id: v4(),
        UserId: user.getDataValue("id"),
        caste: "Bramhin",
        subCaste: "Teachers",
      });
    } else if (probablity > 5) {
      castes.push({
        id: v4(),
        UserId: user.getDataValue("id"),
        caste: "Kshyarathis",
        subCaste: "warriors",
      });
    } else if (probablity > 2) {
      castes.push({
        id: v4(),
        UserId: user.getDataValue("id"),
        caste: "Vaishya",
        subCaste: "merchants",
      });
    } else {
      castes.push({
        id: v4(),
        UserId: user.getDataValue("id"),
        caste: "Sudhra",
        subCaste: "Labours",
      });
    }
  }

  await Schema.Caste.bulkCreate([...castes]);
}

// ~~~~~~~~~~~~~~~~~~~~~~~~ USER CASTE END ~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~~ USER Lifestyle ~~~~~~~~~~~~~~~~~~~~~~~

export async function generateLifeStyleData(allUsers: any, n: number) {
  const lifestyles = [];

  for (const user of allUsers) {
    const probablity = Math.floor(Math.random() * n);
    lifestyles.push({
      id: v4(),
      UserId: user.getDataValue("id"),
      height: 5.2,
      weight: Math.floor(Math.random() * 80),
      bloodGroup: "B+",
      dressStyle: "Traditional",
      bodyShape: "Blonde",
      skinComplextion: "Fair",
      diet:
        probablity > 7 ? "Indian" : probablity > 4 ? "Mughal" : "Continental",
      drinkingHabbits:
        probablity > 7 ? "Chain" : probablity > 4 ? "Occasionally" : "NO",
      smokingHabits: "No",
      sportsFitness:
        probablity > 7 ? "Football" : probablity > 4 ? "Cricket" : "Ludo",
      haveAnyDieases: false,
      descriptionOfDieseases: "N/A",
    });
  }

  await Schema.LifeStyle.bulkCreate([...lifestyles]);
}

// ~~~~~~~~~~~~~~~~~~~~~~~~ USER Lifestyle END ~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~~ USER Occupation ~~~~~~~~~~~~~~~~~~~~~~~

export async function generateFakeOccupation(allUsers: any, n: number) {
  const occupations = [];

  for (const user of allUsers) {
    const probablity = Math.floor(Math.random() * n);
    occupations.push({
      id: v4(),
      UserId: user.getDataValue("id"),
      type: fakerStatic.name.jobType(),
      currentCompanyName: fakerStatic.company.companyName(),
      salary: fakerStatic.finance.amount(340000, 6300000),
      isSelfEmployeed: probablity > 5 ? false : true,
    });
  }

  await Schema.Occupation.bulkCreate([...occupations]);
}

// ~~~~~~~~~~~~~~~~~~~~~~~~ USER Occupation END ~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~~ USER RelativeInformations ~~~~~~~~~~~~~~~~~~~~~~~

export async function generateRelativeInformation(allUsers: any, n: number) {
  const relativeinfos = [];

  for (const user of allUsers) {
    const probablity = Math.floor(Math.random() * n);
    relativeinfos.push({
      id: v4(),
      UserId: user.getDataValue("id"),
      fullname:
        fakerStatic.name.firstName() + " " + fakerStatic.name.lastName(),
      type:
        probablity > 8
          ? "Father"
          : probablity > 6
          ? "Mother"
          : probablity > 3
          ? "Sister"
          : "Brother",
      phoneNumber: fakerStatic.phone.phoneNumber(),
    });
  }

  await Schema.RelativeContact.bulkCreate([...relativeinfos]);
}

// ~~~~~~~~~~~~~~~~~~~~~~~~ USER RelativeInformations END ~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~~ USER FamilyDetails ~~~~~~~~~~~~~~~~~~~~~~~

export async function generateFamilyDetails(allUsers: any, n: number) {
  const familyDetails = [];

  for (const user of allUsers) {
    const probablity = Math.floor(Math.random() * n);
    familyDetails.push({
      id: v4(),
      UserId: user.getDataValue("id"),
      fatherName:
        fakerStatic.name.firstName() + " " + fakerStatic.name.lastName(),
      fatherOccupation: fakerStatic.name.jobTitle(),
      motherName:
        fakerStatic.name.firstName() + " " + fakerStatic.name.lastName(),
      motherOccupation: fakerStatic.name.jobTitle(),
      noOfBrothers: probablity,
      noOfSisters: probablity / 2,
      familyStatus:
        probablity > 8
          ? "Rich Family"
          : probablity > 4
          ? "Middle Class"
          : "Lower Class",
      familyValues:
        probablity > 8
          ? "Open Midden"
          : probablity > 4
          ? "Little Open"
          : "Conservative Class",
      ancestralOrigin: "N/A",
    });
  }

  await Schema.FamilyDetails.bulkCreate([...familyDetails]);
}

// ~~~~~~~~~~~~~~~~~~~~~~~~ USER FamilyDetails END ~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~~ USER ProfilePicture ~~~~~~~~~~~~~~~~~~~~~~~

export async function generateProfilePicture(allUsers: any, n: number) {
  const profilePictures = [];

  for (const user of allUsers) {
    const probablity = Math.floor(Math.random() * n);
    profilePictures.push({
      id: v4(),
      UserId: user.getDataValue("id"),
      filename: fakerStatic.internet.avatar(),
    });
  }

  await Schema.ProfilPicture.bulkCreate([...profilePictures]);
}

// ~~~~~~~~~~~~~~~~~~~~~~~~ USER ProfilePicture END ~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~~ USER Preffered Partner ~~~~~~~~~~~~~~~~~~~~~~~

export async function generatePrefferedPartner(allUsers: any, n: number) {
  const prefferedPartners = [];

  for (const user of allUsers) {
    const probablity = Math.floor(Math.random() * n);
    prefferedPartners.push({
      id: v4(),
      UserId: user.getDataValue("id"),
      maxHeight: Math.floor(Math.random() * (7 - 3)),
      minHeight: Math.floor(Math.random() * (7 - 3) + 0.754),
      minAge: "23",
      maxAge: "38",
      expectedSalary: fakerStatic.finance.amount(),
      salaryType: probablity < 6 ? "INR" : "DOLLAR",
    });
  }

  await Schema.PrefferedPartnerChoice.bulkCreate([...prefferedPartners]);
}

// ~~~~~~~~~~~~~~~~~~~~ FAKE Education Generator ~~~~~~~~~~~~~~~~~~~~~~~~~

export async function generateFakeEducation(allUsers: any, n: number) {
  const educations = [];
  for (const user of allUsers) {
    const probablity = Math.floor(Math.random() * n);
    educations.push({
      id: v4(),
      UserId: user.getDataValue("id"),
      type:
        probablity > 7 ? "Masters" : probablity > 4 ? "Undergraduate" : "Hons",
      degree:
        probablity > 7 ? "M.Tech" : probablity > 4 ? "B.Tech" : "Commerce",
      institutionName: fakerStatic.company.companyName(),
      specializationIn: fakerStatic.name.jobType(),
      passoutYear: fakerStatic.date.between("2010-01-01", "2023-12-31"),
    });
  }

  await Schema.Education.bulkCreate([...educations]);
}

export async function generateRandomProfileMatchs(allUsers: any, n: any) {
  const randomRangeGenerator = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min)) + min;

  const favouritePersons = [];
  const personWhoFavouritedYours = [];

  for (const user of allUsers) {
    const user1 = allUsers[randomRangeGenerator(1, n)];
    let user2 = allUsers[randomRangeGenerator(1, n)];

    favouritePersons.push({
      id: v4(),
      UserId: user1.getDataValue("id"),
      favouritePersonId: user2.getDataValue("id"),
    });

    user2 = allUsers[randomRangeGenerator(1, n)];
    personWhoFavouritedYours.push({
      id: v4(),
      UserId: user1.getDataValue("id"),
      personWhoFavoritedYouID: user2.getDataValue("id"),
    });
  }

  await Schema.FavouritePerson.bulkCreate([...favouritePersons]);
  await Schema.PersonWhoFavouritedHimself.bulkCreate([
    ...personWhoFavouritedYours,
  ]);
}

// ~~~~~~~~~~~~~~~~~~~~ FAKE DATA GENERATOR ~~~~~~~~~~~~~~~~~~~~~~~~~

export async function fakeDataGenerator() {
  return new Promise(async (resolve, reject) => {
    try {
      const allUsers = await Schema.User.findAll();
      const n = allUsers.length;

      await fakeAddressGenerator(allUsers, n);
      await casteGenerator(allUsers, n);
      await generateLifeStyleData(allUsers, n);
      await generateFakeOccupation(allUsers, n);
      await generateRelativeInformation(allUsers, n);
      await generateFamilyDetails(allUsers, n);
      await generateProfilePicture(allUsers, n);
      await generatePrefferedPartner(allUsers, n);
      await generateFakeEducation(allUsers, n);
      await generateRandomProfileMatchs(allUsers, n);

      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
}
