export const MARKDOWN_CV = `
Johnny Coder
============

-------------------     ----------------------------
1 MyAddress                        email@example.com
MyTown 1000                          @twitter_handle
MyCountry                           1800 my-phone-nr
-------------------     ----------------------------

Education
---------

2010-2014 (expected)
:   **PhD, Computer Science**; Awesome University (MyTown)

    *Thesis title: Deep Learning Approaches to the Self-Awesomeness
     Estimation Problem*

2007-2010
:   **BSc, Computer Science and Electrical Engineering**; University of
    HomeTown (HomeTown)

    *Minor: Awesomeology*

Experience
----------

**Your Most Recent Work Experience:**

Short text containing the type of work done, results obtained,
lessons learned and other remarks. Can also include lists and
links:

* First item

* Item with [link](http://www.example.com). Links will work both in
  the html and pdf versions.

**That Other Job You Had**

Also with a short description.

Technical Experience
--------------------

My Cool Side Project
:   For items which don't have a clear time ordering, a definition
    list can be used to have named items.

    * These items can also contain lists, but you need to mind the
      indentation levels in the markdown source.
    * Second item.

Open Source
:   List open source contributions here, perhaps placing emphasis on
    the project names, for example the **Linux Kernel**, where you
    implemented multithreading over a long weekend, or **node.js**
    (with [link](http://nodejs.org)) which was actually totally
    your idea...

Programming Languages
:   **first-lang:** Here, we have an itemization, where we only want
    to add descriptions to the first few items, but still want to
    mention some others together at the end. A format that works well
    here is a description list where the first few items have their
    first word emphasized, and the last item contains the final few
    emphasized terms. Notice the reasonably nice page break in the pdf
    version, which wouldn't happen if we generated the pdf via html.

:   **second-lang:** Description of your experience with second-lang,
    perhaps again including a [link] [ref], this time placing the url
    reference elsewhere in the document to reduce clutter (see source
    file). 

:   **obscure-but-impressive-lang:** We both know this one's pushing
    it.

:   Basic knowledge of **C**, **x86 assembly**, **forth**, **Common Lisp**

[ref]: https://github.com/githubuser/superlongprojectname

Extra Section, Call it Whatever You Want
----------------------------------------

* Human Languages:

     * English (native speaker)
     * ???
     * This is what a nested list looks like.

* Random tidbit

* Other sort of impressive-sounding thing you did`;


export const JSON_EXAMPLE = 
`
{
  "AWSTemplateFormatVersion": "2010-09-09",
  "Parameters" : {
      "BucketName": {
          "Description": "Name for the bucket in to be used for hosting",
          "Type": "String",
          "Default": "test.conor.com"
      }
  },
  "Resources": {
      "S3Bucket": {
          "Type": "AWS::S3::Bucket",
          "Properties": {
              "AccessControl": "PublicRead",
              "BucketName": { "Ref": "BucketName" },
              "WebsiteConfiguration": {
                  "IndexDocument": "index.html"
              }
          }
      }, 
      "testDistribution" : {
          "Type" : "AWS::CloudFront::Distribution",
          "Properties" : {
              "DistributionConfig" : {
                  "Origins" : [ {
                      "DomainName" : { 
                          "Fn::Join" : [ 
                              "", [ { "Ref": "BucketName"} , ".s3.amazonaws.com"] 
                          ] 
                      },
                      "Id" : { 
                          "Fn::Join" : [ 
                              "", [ { "Ref": "BucketName"} , "/index.html"] 
                          ] 
                      },
                      "S3OriginConfig" : {
                          "OriginAccessIdentity" :
                              { 
                                  "Fn::Join" : [ "", [ "origin-access-identity/cloudfront/", 
                                      {
                                          "Ref": "TheCloudFrontOriginAccessIdentity"
                                      } 
                                  ] ] 
                              }
                      }
                  }],
                  "Enabled" : "true",
                  "Comment" : "Some comment",
                  "DefaultRootObject" : "index.html",
                  "DefaultCacheBehavior" : {
                      "AllowedMethods" : [ "GET", "HEAD" ],  
                      "TargetOriginId" :  { 
                          "Fn::Join" : [ 
                              "", [ { "Ref": "BucketName"} , "/index.html"] 
                          ] 
                      },
                      "ForwardedValues" : {
                          "QueryString" : "false",
                          "Cookies" : { "Forward" : "none" }
                      },
                      "ViewerProtocolPolicy" : "allow-all"
                  },
                 "PriceClass" : "PriceClass_200",
                 "ViewerCertificate" : { "CloudFrontDefaultCertificate" : "true" }  
              }
          }
      },
      "TheCloudFrontOriginAccessIdentity": {
          "Type": "AWS::CloudFront::CloudFrontOriginAccessIdentity",
          "Properties": {
              "CloudFrontOriginAccessIdentityConfig": {
                  "Comment": "CloudFormation - Identity"
              }
          }
      }
  }, 
  "Outputs" : {
      "WebsiteURL" : {
         "Value" : { "Fn::GetAtt" : [ "S3Bucket", "WebsiteURL" ] },
         "Description" : "URL for website hosted on S3"
      },
      "S3BucketSecureURL" : {
         "Value" : { "Fn::Join" : [
            "", [ "https://", { "Fn::GetAtt" : [ "S3Bucket", "DomainName" ] } ]
         ] },
         "Description" : "Name of S3 bucket to hold website content"
      }
  }
}`;