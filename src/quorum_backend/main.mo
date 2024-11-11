import Text "mo:base/Text";
import Bool "mo:base/Bool";
import HashMap "mo:base/HashMap";
//import Nat "mo:base/Nat";
import Array "mo:base/Array";
 
actor {

    public type User = {
        username: Text;
        displayName: Text;
        pfp: Text;
        principalId: Text;
        organizations: [Text];
        elections: [Text];
    };

    private var users: HashMap.HashMap<Text, User> = HashMap.HashMap<Text, User>(10, Text.equal, Text.hash);

    public func addUser(username: Text, displayName: Text, pfp: Text, principalId: Text, organizations: [Text], elections: [Text]): async Bool {
        let newUser: User = {
            username = username;
            displayName = displayName;
            pfp = pfp;
            principalId = principalId;
            organizations = organizations;
            elections = elections;
        };
        users.put(principalId, newUser);
        return true;
    };

    public func getUser(principalId: Text): async ?User {
        return users.get(principalId);
    };

    public func updateUser(principalId: Text, displayName: ?Text, organizations: ?[Text], elections: ?[Text]) : async Bool 
    {
        switch (users.get(principalId)) {
            case (?existingUser) {
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
                    pfp = existingUser.pfp;
                    principalId = existingUser.principalId;
                };
                users.put(principalId, updatedUser);
                return true;
            };
            case null { return false; }
        };
    };
    public func deleteUser(principalId: Text) : async Bool
    {
        return users.remove(principalId) != null;
    };
    public type Organisation = {
        name: Text;
        isPublic: Bool;
        description: Text;
        members: [Text]; //list of user wallet addresses
        electionConducted: [Text]; //this will contain the id of conducted elections
        admins: [Text]; // New field for admins
    };
    private var organiMap :HashMap.HashMap<Text, Organisation> =HashMap.HashMap<Text, Organisation>(10, Text.equal, Text.hash);


    public func addOrgan(name: Text, isPublic: Bool, description: Text, members: [Text], electionConducted: [Text], admins: [Text]) : async Bool
    {
        let newOrgan : Organisation = {
            name = name;
            isPublic = isPublic;
            description = description;
            members = members;
            electionConducted = electionConducted;
            admins = admins;
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
                    admins = existingOrgan.admins;
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
      return elecMap.get(electionId);
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


    public func joinOrgan(principalId: Text, newOrgan: Text): async Bool 
    {
        switch (users.get(principalId)) {
            case (?existingUser) {
                let updatedUser = {
                    username = existingUser.username;
                    displayName = existingUser.displayName;
                    pfp = existingUser.pfp;
                    principalId = existingUser.principalId;
                    organizations = Array.append(existingUser.organizations, [newOrgan]);
                    elections = existingUser.elections;
                };
                users.put(principalId, updatedUser);
                return true;
            };
            case null { return false; }
        };
    };
    public func addMember(name: Text, principalId: Text): async Bool 
    {
        switch (organiMap.get(name)) {
            case (?existingOrgan) {
                let updatedOrgan = {
                    name = existingOrgan.name;
                    isPublic = existingOrgan.isPublic;
                    description = existingOrgan.description;
                    members = Array.append(existingOrgan.members, [principalId]);
                    electionConducted = existingOrgan.electionConducted;
                    admins = existingOrgan.admins;
                };
                organiMap.put(name, updatedOrgan);
                return true;
            };
            case null { return false; };
        };
    };


    public func leaveOrgan(principalId: Text, organName: Text): async Bool 
    {
      switch (users.get(principalId)) {
          case (?existingUser) {
              let updatedOrgan = Array.filter(existingUser.organizations, func(org: Text):Bool {
                  org != organName
              });
              let updatedUser = {
                  username = existingUser.username;
                  displayName = existingUser.displayName;
                  pfp = existingUser.pfp;
                  principalId = existingUser.principalId;
                  organizations = updatedOrgan;
                  elections = existingUser.elections;
              };
              users.put(principalId, updatedUser);
              return true;
          };
          case null { return false; };
      };
    };

    public func remMember(name: Text, principalId: Text): async Bool
    {
      switch(organiMap.get(name))
      {
        case(?existingOrgan){
          let updatedUser = Array.filter(existingOrgan.members, func(use: Text): Bool
          {
            use != principalId
          });
          let updatedOrgan = {
            name =existingOrgan.name;
            isPublic = existingOrgan.isPublic;
            description = existingOrgan.description;
            members = updatedUser;
            electionConducted = existingOrgan.electionConducted;
            admins = existingOrgan.admins;
          };
          organiMap.put(name, updatedOrgan);
          return true;
        };
        case null {return false; };
      };
    };

    public func isNewUser(principalId: Text) : async Bool {
        switch (users.get(principalId)) {
            case (null) { return true; };  
            case (?user) { return false; }; 
        };
    };

};