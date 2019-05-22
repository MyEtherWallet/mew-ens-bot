import configs from "./configs";
export default {
  ERRORS: {
    not_valid: "This tweet is not in the right format.",
    not_applicable: "Not applicable",
    not_enough_followers: `You don't have enough followers. (min. ${
      configs.Rules.min_followers
    })`,
    too_new: "Your account is too new. (min. 6 months)",
    too_many_registrations: `You've registered already! (Max ${
      configs.Rules.max_names_per_account
    })`,
    already_processed: "This was already processed.",
    invalid_address: "Your public address is invalid.",
    invalid_name: "Your ENS domain is invalid.",
    name_not_available: "This domain has been taken."
  },
  SUCCESS: {}
};
