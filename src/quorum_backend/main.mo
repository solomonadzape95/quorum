import Text "mo:base/Text";
import Bool "mo:base/Bool";
import HashMap "mo:base/HashMap";
//import Nat "mo:base/Nat";
import Array "mo:base/Array";
 
actor {

    public type User = {
        username: Text;
        displayName: Text;
        walletAddress: Text;
        organizations: [Text];
        elections: [Text];
    };

    private var users: HashMap.HashMap<Text, User> = HashMap.HashMap<Text, User>(10, Text.equal, Text.hash);

    public func addUser(username: Text, displayName: Text, walletAddress: Text, organizations: [Text], elections: [Text]): async Bool {
        let newUser: User = {
            username = username;
            displayName = displayName;
            walletAddress = walletAddress;
            organizations = organizations;
            elections = elections;
        };
        users.put(walletAddress, newUser);
        return true;
    };

    public func getUser(walletAddress: Text): async ?User {
        return users.get(walletAddress);
    };

    public func updateUser(walletAddress: Text, displayName: ?Text, organizations: ?[Text], elections: ?[Text]) : async Bool 
    {
        switch (users.get(walletAddress)) {
            case (?existingUser) {
                // Create a new updated User instance with modified properties
                let updatedUser = {
                    displayName = switch (displayName) {
                        case (?newDisplayName) newDisplayName;
                        case null existingUser.displayName;
                    };
                    organizations = switch (organizations) {
                        case (?newOrganizations) newOrganizations;
                        case null existingUser.organizations;
                    };
                    elections = switch (elections) {
                        case (?newElections) newElections;
                        case null existingUser.elections;
                    };
                    username = existingUser.username;
                    walletAddress = existingUser.walletAddress;
                };
                users.put(walletAddress, updatedUser);
                return true;
            };
            case null { return false; }
        };
    };
    public func deleteUser(walletAddress: Text) : async Bool
    {
        users.remove(walletAddress) != null;
        
    };
    public type Organisation = {
        name: Text;
        isPublic: Bool;
        description: Text;
        members: [Text]; //list of user wallet addresses
        electionConducted: [Text]; //this will contain the id of conducted elections
    };
    private var organiMap :HashMap.HashMap<Text, Organisation> =HashMap.HashMap<Text, Organisation>(10, Text.equal, Text.hash);


    public func addOrgan(name: Text, isPublic: Bool, description: Text, members: [Text], electionConducted: [Text]) : async Bool
    {
        let newOrgan : Organisation = {
            name = name;
            isPublic = isPublic;
            description = description;
            members = members;
            electionConducted = electionConducted;
        };
        organiMap.put(name, newOrgan);
        return true;
    };

    public func getOrgan(name: Text) : async ?Organisation
    {
        return organiMap.get(name);
    };

    public func updateOrgan(name: Text, isPublic: ?Bool, description: ?Text, members: ?[Text], electionConducted: ?[Text]): async Bool
    {
        switch(organiMap.get(name))
        {
            case(?existingOrgan)
            {
                let updatedOrgan = {
                    name = existingOrgan.name;
                    isPublic = switch (isPublic){
                        case (?newisPublic) newisPublic;
                        case null existingOrgan.isPublic;
                    };
                    description = switch (description){
                        case (?newdescription) newdescription;
                        case null existingOrgan.description;
                    };
                    members = switch (members){
                        case (?newmembers) newmembers;
                        case null existingOrgan.members;
                    };
                    electionConducted = switch (electionConducted){
                        case (?newelectionConducted) {
                            newelectionConducted;
                        };
                        case null existingOrgan.electionConducted;
                    };
                };
                organiMap.put(name, updatedOrgan);
                return true;
            };
            case null { return false;};
        }
    };

    public func deleteOrgan(name: Text) : async Bool
    {
        return organiMap.remove(name) != null;
    };

    public type Contestants = {
        contestantId: Text;
        name: Text;
        description: Text;
        tally: Nat;
    };
    // private var ContesMap :HashMap.HashMap<Text, Contestants> = HashMap.HashMap<Text, Contestants>(10, Text.equal, Text.hash);

    // public func addContestants(organization: Text, election: Text, name: Text, walletAddress: Text, stake: Nat): async Bool
    // {
    //     let newContest: Contestants = {
    //         organization = organization;
    //         election = election;
    //         name = name;
    //         walletAddress = walletAddress;
    //         stake = stake;
    //     };
    //     ContesMap.put(walletAddress, newContest);
    //     return true;
    // };

    // public func getContest(walletAddress: Text): async ?Contestants
    // {
    //     return ContesMap.get(walletAddress);
    // };

    // public func updateContest(walletAddress: Text, organization: ?Text, election: ?Text, name: ?Text, stake: ?Nat): async Bool
    // {
    //     switch(ContesMap.get(walletAddress)) {
    //         case(?existingContest)
    //         {
    //             let updatedContest = {
    //                 walletAddress = existingContest.walletAddress;
    //                 organization = switch(organization) {
    //                     case (?neworganization) neworganization;
    //                     case null existingContest.organization;
    //                 };
    //                 election = switch(election) {
    //                     case (?newelection) newelection;
    //                     case null existingContest.election;
    //                 };
    //                 name = switch(name) {
    //                     case (?newname) newname;
    //                     case null existingContest.name;
    //                 };
    //                 stake = switch(stake) {
    //                     case (?newstake) newstake;
    //                     case null existingContest.stake;
    //                 };
    //             };
    //             ContesMap.put(walletAddress, updatedContest);
    //             return true;
    //         };
    //         case null {return false;};
            
    //     };
    // };
    
    // public func deleteContest(walletAddress: Text): async Bool
    // {
    //     return ContesMap.remove(walletAddress) != null;
    // }; 

    public type Election = {
      electionId: Text;
      description: Text;
      contestants: [Contestants];
    }; 

    private var elecMap: HashMap.HashMap<Text, Election> = HashMap.HashMap<Text, Election>(10, Text.equal, Text.hash);

    public func createElec(electionId: Text, description: Text, contestants: [Contestants]): async Bool
    {
      let newElection : Election = {
        electionId = electionId;
        description = description;
        contestants = contestants;
      };
      elecMap.put(electionId, newElection);
      return  true;
    };
    
    public func getElec(electionId: Text): async ?Election 
    {
      elecMap.get(electionId);
    };
    public func vote(electionId: Text, candidateId: Text): async Bool {
    switch (elecMap.get(electionId)) {
        case (?election) {
            // Explicitly specify the type of contestant
            let updatedContestants = Array.map<Contestants, Contestants>(election.contestants, func(contestant) {
                if (contestant.contestantId == candidateId) {
                    // Return a new contestant with updated tally
                    { contestantId = contestant.contestantId; name = contestant.name; description = contestant.description; tally = contestant.tally + 1 };
                } else {
                    // Return the contestant as-is if no match
                    contestant;
                }
            });

            // Update the election record with updated contestants
            let updatedElection = {
                description = election.description;
                electionId = election.electionId;
                contestants = updatedContestants
            };

            elecMap.put(electionId, updatedElection);
            return true;
        };
        case null { return false; }
    };
};


    public func joinOrgan(walletAddress: Text, newOrgan: Text): async Bool 
    {
        switch (users.get(walletAddress)) {
            case (?User) {
                // Create a new User record with updated organizations
                let updatedUser = {
                    username = User.username;
                    displayName = User.displayName;
                    walletAddress = User.walletAddress;
                    organizations = Array.append(User.organizations, [newOrgan]);  // Append new organization
                    elections = User.elections;
                };
                users.put(walletAddress, updatedUser);
                return true;
            };
            case null { return false; }  // User not found
        };
    };
    public func addMember(name: Text, walletAddress: Text): async Bool 
    {
        switch (organiMap.get(name)) {
            case (?Organization) {
                // Create a new User record with updated organizations
                let updatedOrgan = {
                    name = Organization.name;
                    isPublic = Organization.isPublic;
                    description = Organization.description;
                    members = Array.append(Organization.members, [walletAddress]);
                    electionConducted = Organization.electionConducted;
                };
                organiMap.put(name, updatedOrgan);
                return true;
            };
            case null { return false; };  // User not found
        };
    };

    // public func remMember(name: Text, walletAddress: Text) : async Bool
    // {

    // }
    public func leaveOrgan(walletAddress: Text, organName: Text): async Bool 
    {
      switch (users.get(walletAddress)) {
          case (?existingUser) {
              // Filter out the organization to be removed
              let updatedOrgan = Array.filter(existingUser.organizations, func(org: Text):Bool {
                  org != organName
              });

              // Create a new user record with the updated organizations
              let updatedUser = {
                  username = existingUser.username;
                  displayName = existingUser.displayName;
                  walletAddress = existingUser.walletAddress;
                  organizations = updatedOrgan;
                  elections = existingUser.elections;
              };

              // Update the user in the HashMap
              users.put(walletAddress, updatedUser);
              return true;
          };
          case null { return false; };
      };
    };
    public func remMember(name: Text, walletAddress: Text): async Bool
    {
      switch(organiMap.get(name))
      {
        case(?existingOrgan){
          let updatedUser = Array.filter(existingOrgan.members, func(use: Text): Bool
          {
            use != walletAddress
          });
          let updatedOrgan = {
            name =existingOrgan.name;
            isPublic = existingOrgan.isPublic;
            description = existingOrgan.description;
            members = updatedUser;
            electionConducted = existingOrgan.electionConducted;
          };
          organiMap.put(name, updatedOrgan);
          return true;
        };
        case null {return false; };
      };
    };

};