export default {
  greetings: {
    regex: ['^(hello|hey|hi|Alo|hola)[?!.,¿]*$'],
    copys: {
      copy_1: ['Hi! How is your day going?']
    }
  },

  good_morning: {
    regex: [
      '^(buenos días|buen día|buenos dias|wenos dias|bon dia|morning|good morning)[?!.,¿]*$'
    ], //(\\?|!|\\.|,|¿)*$
    copys: {
      copy_1: ['Good Morning!']
    }
  },

  good_afternoon: {
    regex: ['^(buenas tardes|bona tarda|good afternoon|good evening)[?!.,¿]*$'],
    copys: {
      copy_1: ['Good afternoon!']
    }
  },

  gratitude: {
    regex: [
      '^(gracies|nice|fine|perfect|merci|thank you|genial|gracias|thanks|thx|vale|👏|👍|👌)[?!.,¿]*$'
    ],
    copys: {
      copy_1: ["It's a pleasure."]
    }
  },

  good_night: {
    regex: [
      '^(buenas noches|a dormir|bona nit|hasta mañana|good night|sweet dreams)[?!.,¿]*$'
    ],
    copys: {
      copy_1: ['Good night! Hope you rest comfortably!']
    }
  },
  good_bye: {
    regex: [
      '^(goodbye|good bye|adéu|adeu|deu|dew|dw|a10|chao|bye|ciao|see you|c u|cu|hasta luego|hasta otra|adiós|adios|pues adiós)[?!.,¿]*$'
    ],
    copys: {
      copy_1: ['I hope to see you again.']
    }
  },

  insults: {
    regex: [
      '^(Alcoholic|Amateur|Analphabet|Anarchist|Ape|Arse|Arselicker|Ass|Assmaster|Ass-kisser|Ass-nugget|Ass-wipe|Asshole|Backwoodsman|Balls|Bandit|Barbar|Bastard|Bastard|Beavis|Beginner|Biest|Bitch|Blubbergut|Bogeyman|Booby|Boozer|Bozo|Brain-fart|Brainless|Brainy|Brontosaurus|Brownie|Bugger|Bugger,silly|Bulloks|Bum|Bum-fucker|Butt|Buttfucker|Butthead|Callboy|Callgirl|Camel|Cannibal|Caveman|Chaavanist|Chaot|Chauvi|Cheater|Chicken|Childrenfucker|Clit|Clown|Cock|Cockmaster|Cockup|Cockboy|Cockfucker|Cockroach|Coky|Conmerchant|Con-man|Countrybumpkin|Cow|Creep|Creep|Cretin|Criminal|Cunt|Cuntsucker|Daywalker|Deathlord|Derrbrain|Desperado|Devil|Dickhead|Dinosaur|Disguestingpacket|Dizbrain|Do-Do|Dog|Dog|dirty|Dogshit|Donkey|Drakula|Dreamer|Drinker|Drunkard|Dufus|Dulles|Dumbo|Dummy|Dumpy|Egoist|Eunuch|Exhibitionist|Fake|Fanny|Farmer|Fart|Fart,shitty|Fatso|Fellow|Fibber|Fish|Fixer|Flake|FlashHarry|Freak|Frog|Fuck|Fuckface|Fuckhead|Fucknoggin|Fucker|Gangster|Ghost|Goose|Gorilla|Grouch|Grumpy|Head,fat|Helldog|Hillbilly|Hippie|Homo|Homosexual|Hooligan|Horsefucker|Idiot|Ignoramus|Jack-ass|Jerk|Joker|Junkey|Killer|Lardface|Latchkeychild|Learner|Liar|Looser|Lucky|Lumpy|Luzifer|Macho|Macker|Man,old|Minx|Missinglink|Monkey|Monster|Motherfucker|Muckypub|Mutant|Neanderthal|Nerfhearder|Nobody|Nurd|Nuts,numb|Oddball|Oger|Oildick|Oldfart|Orang-Uthan|Original|Outlaw|Pack|Painintheass|Pavian|Pencildick|Pervert|Pig|Piggy-wiggy|Pirate|Pornofreak|Prick|Prolet|Queer|Querulant|Rat|Rat-fink|Reject|Retard|Riff-Raff|Ripper|Roboter|Rowdy|Rufian|Sack|Sadist|Saprophyt|Satan|Scarab|Schfincter|Shark|Shiteater|Shithead|Simulant|Skunk|Skuzbag|Slave|Sleeze|Sleezebag|Slimer|Slimybastard|Smallpricked|Snail|Snake|Snob|Snot|Sonofabitch|Square|Stinker|Stripper|Stunk|Swindler|Swine|Teletubby|Thief|Toilettcleaner|Tussi|Typ|Unlike|Vampir|Vandale|Varmit|Wallflower|Wanker|Wanker|WeezeBag|Whore|Wierdo|Wino|Witch|Womanizer|Woodyallen|Worm|Xena|Xenophebe|Xenophobe|XXXWatcher|Yak|Yeti|Zitface)[?!.,¿]*$'
    ],
    copys: {
      copy_1: ['Please, be more polite!']
    }
  },
  bye: {
    remember_i_will_be_here_for_your_questions: [
      'Okay! Remember I will be here for your questions!'
    ],
    have_a_nice_day: ['Have a nice day!']
  },
  something_else: {
    is_there_anything_else_i_can_help_you: [
      'Is there anything else I can help you with?'
    ],
    yes: ['Yes'],
    no: ['No, thanks']
  },

  initial: {
    no_access: ["You don't have access to this bot..."],
    subscribed: ['You have been subscribed to Dexma Bot!'],
    welcome: ['Welcome!'],
    go: ['Go'],
    check_device_title: ['Check Device'],
    check_device_desc: ['Check device status'],
    sensor_data_title: ['Sensor Data'],
    sensor_data_desc: ['Check sensor data'],
    contract_expiration_title: ['Contract Expiration'],
    contract_expiration_desc: ['Check contract expiration'],
    league_tables_title: ['League Tables'],
    league_tables_desc: ['Check league tables'],
    recommendations_title: ['Recommendations'],
    recommendations_desc: ['See Recommendations'],
    anomalies_title: ['Anomalies'],
    anomalies_desc: ['See Anomalies']
  },

  check_device: {
    location: {
      which_location: ['Which is the location that you want to check?'],
      select_location: ['Select Location ▼']
    },
    device: {
      selected_location: ['Selected Location:'],
      which_device: [
        'Which of the following devices is the one that you want to know its status?'
      ],
      select_device: ['Select Device ▼']
    },
    stats: {
      without_data: ['Without data within the last 24 hours'],
      with_data: ['With data, last time was '],
      results_not_available: ['Sorry, these results are not available.'],
      we_have_checked_your_device: ['We have checked that your device is:']
    }
  },
  sensor_data: {
    period: {
      which_period: ['Which is the time period that you want to check out?']
    },
    location: {
      which_location: [
        'Which is the location that you want to receive data from?'
      ],
      select_location: ['Select Location ▼']
    },
    device: {
      selected_location: ['Selected Location:'],
      which_device: [
        'Which of the following devices is the one that you want to receive data from?'
      ],
      select_device: ['Select Device ▼']
    },
    results: {
      stats: [
        'We have checked your consumption for the period that you have selected is:'
      ],
      error: ['An error has occurred']
    }
  },
  contract_expiration: {
    you_have_consulted_your_contracts: ['You have consulted your contracts at:']
  },
  league_tables: {
    period: {
      which_period: ['Which is the time period that you want to check out?']
    },
    supply: {
      which_supply: ['Which supply do you want to check of your portfolio?']
    },
    performance: {
      buildings_of_your_portfolio: [
        'Here you have the 10 buildings in your portfolio with best performance (worst consumption)'
      ],
      see_results: ['See results ▼']
    },
    results: {
      best_results: ['Best results:'],
      worst_results: ['Worst results:']
    }
  },

  recommendations: {
    subscribe: ['Do you want to subscribe to the Recommendations Service?'],
    unsubscribe: ['Do you want to unsubscribe of the Recommendations Service?'],
    recommendations_with_payback_msg: [
      'Top-3 Recommendations requiring investment (sorted by payback):'
    ],
    recommendations_with_payback: [
      'You can save up to energySavingsAnnual KWh/year in location LocationName by implementing Retrofit in your Resource consumption and the Payback would be payback years.'
    ],
    recommendations_without_payback_msg: [
      'The three recommendations without payback and sorted by descending.'
    ],
    recommendations_without_payback: [
      'You can save up to energySavingsAnnual KWh/year in location LocationName by implementing Retrofit in your Resource consumption.'
    ],
    location: {
      which_location: [
        'Do you want to browse all your Recommendations? Select your Location:'
      ],
      select_location: ['Select Location ▼']
    },
    selected_location: ['Selected Location:'],
    see_recommendations: ['Recommendations ▼'],
    you_have_consulted_your_recommendations: [
      'You have consulted your recommendations at:'
    ],
    please_select_location: ['Please, select a location:'],
    some_recommendations: [
      'By the way, there are some top recommendations available for you. Do you want to see them?'
    ],
    browse_location: [
      'By the way, you can see your recommendations per location.'
    ],
    browse: ['These are your recommendations.'],
    yes: ['Yes'],
    no: ['No'],
    you_have_been_subscribed: ['You have been subscribed to recommendations!'],
    you_will_receive_notifications: [
      'You will receive your notifications every 7 days.'
    ],
    you_have_been_unsubscribed: [
      'You have been unsubscribed of recommendations!'
    ],
    want_to_browse: ['Do you want to browse all your Recommendations?']
  },
  anomalies: {
    subscribe: ['Do you want to subscribe to the Anomalies Service?'],
    unsubscribe: ['Do you want to unsubscribe of the Anomalies Service?'],
    anomalies_good_msg: ['Top-3 efficiencies 👏🏻👏🏻👏🏻'],
    anomalies_bad_msg: ['Top-3 inefficiencies 🙈'],
    location: {
      which_location: [
        'Do you want to browse all your Anomalies? Select your Location:'
      ],
      select_location: ['Select Location ▼']
    },
    selected_location: ['Selected Location:'],
    see_anomalies: ['Anomalies ▼'],
    you_have_consulted_your_anomalies: [
      'You have consulted your anomalies at:'
    ],
    please_select_location: ['Please, select a location:'],
    some_anomalies: [
      'By the way, there are some efficiencies and anomalies available for you. Do you want to see them?'
    ],
    browse_location: ['By the way, you can see your anomalies per location.'],
    browse: ['These are your anomalies.'],
    yes: ['Yes'],
    no: ['No'],
    you_have_been_subscribed: ['You have been subscribed to anomalies!'],
    you_will_receive_notifications: [
      'You will receive your notifications every 7 days.'
    ],
    you_have_been_unsubscribed: ['You have been unsubscribed of anomalies!'],
    want_to_browse: ['Do you want to browse all your Anomalies?']
  }
}
