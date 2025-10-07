import type { Schema, Struct } from '@strapi/strapi';

export interface FooterCtaButton extends Struct.ComponentSchema {
  collectionName: 'components_footer_cta_buttons';
  info: {
    displayName: 'cta_button';
  };
  attributes: {
    label: Schema.Attribute.String;
    name: Schema.Attribute.String;
    variants: Schema.Attribute.Enumeration<['primary', 'secondary']>;
  };
}

export interface FooterFooterLink extends Struct.ComponentSchema {
  collectionName: 'components_footer_footer_links';
  info: {
    displayName: 'Company Links';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface FooterLegalLinks extends Struct.ComponentSchema {
  collectionName: 'components_footer_legal_links';
  info: {
    displayName: 'Legal Links';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface FooterSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_footer_social_links';
  info: {
    displayName: 'Social Link';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    platform: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface FooterSupportLinks extends Struct.ComponentSchema {
  collectionName: 'components_footer_support_links';
  info: {
    displayName: 'Support Links';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface GlobalNotification extends Struct.ComponentSchema {
  collectionName: 'components_global_notifications';
  info: {
    displayName: 'Notification';
  };
  attributes: {
    description: Schema.Attribute.String;
    time: Schema.Attribute.Time;
    title: Schema.Attribute.String;
  };
}

export interface HeroAppstore extends Struct.ComponentSchema {
  collectionName: 'components_hero_appstores';
  info: {
    displayName: 'appstore';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    url: Schema.Attribute.String;
  };
}

export interface HeroPlaystore extends Struct.ComponentSchema {
  collectionName: 'components_hero_playstores';
  info: {
    displayName: 'playstore';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    url: Schema.Attribute.String;
  };
}

export interface HeroTestimonialCard extends Struct.ComponentSchema {
  collectionName: 'components_hero_testimonial_cards';
  info: {
    displayName: 'Testimonial Card';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String;
    text: Schema.Attribute.Text;
  };
}

export interface HowItWorksButtons extends Struct.ComponentSchema {
  collectionName: 'components_how_it_works_buttons';
  info: {
    displayName: 'button_with_steps';
  };
  attributes: {
    button_name: Schema.Attribute.String;
    steps: Schema.Attribute.Component<'how-it-works.how-it-work-step', true>;
  };
}

export interface HowItWorksHowItWorkStep extends Struct.ComponentSchema {
  collectionName: 'components_how_it_works_how_it_work_steps';
  info: {
    displayName: 'how_it_work_step';
  };
  attributes: {
    step_description: Schema.Attribute.RichText;
    step_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    step_title: Schema.Attribute.String;
  };
}

export interface NavigationCtaButton extends Struct.ComponentSchema {
  collectionName: 'components_navigation_cta_buttons';
  info: {
    displayName: 'cta_button';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<['primary', 'secondary']>;
  };
}

export interface NavigationNavLink extends Struct.ComponentSchema {
  collectionName: 'components_navigation_nav_links';
  info: {
    displayName: 'Nav Link';
  };
  attributes: {
    label: Schema.Attribute.String;
    order: Schema.Attribute.Integer;
    url: Schema.Attribute.String;
  };
}

export interface PartnerPartnerCard extends Struct.ComponentSchema {
  collectionName: 'components_partner_partner_cards';
  info: {
    displayName: 'Partner Card';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface WhoIsBuiltForCard extends Struct.ComponentSchema {
  collectionName: 'components_who_is_built_for_cards';
  info: {
    displayName: 'card';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface WhyEstilityWhyEstilityCard extends Struct.ComponentSchema {
  collectionName: 'components_why_estility_why_estility_cards';
  info: {
    displayName: 'why-estility-card';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'footer.cta-button': FooterCtaButton;
      'footer.footer-link': FooterFooterLink;
      'footer.legal-links': FooterLegalLinks;
      'footer.social-link': FooterSocialLink;
      'footer.support-links': FooterSupportLinks;
      'global.notification': GlobalNotification;
      'hero.appstore': HeroAppstore;
      'hero.playstore': HeroPlaystore;
      'hero.testimonial-card': HeroTestimonialCard;
      'how-it-works.buttons': HowItWorksButtons;
      'how-it-works.how-it-work-step': HowItWorksHowItWorkStep;
      'navigation.cta-button': NavigationCtaButton;
      'navigation.nav-link': NavigationNavLink;
      'partner.partner-card': PartnerPartnerCard;
      'who-is-built-for.card': WhoIsBuiltForCard;
      'why-estility.why-estility-card': WhyEstilityWhyEstilityCard;
    }
  }
}
