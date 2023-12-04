terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"

}

data "aws_eip" "my_instance_eip" {
  public_ip = "52.88.175.223"
}


provider "aws" {
  region  = "us-west-2"
}


resource "aws_eip_association" "eip_assoc" {
  instance_id   = aws_instance.app_server.id
  allocation_id = data.aws_eip.my_instance_eip.id
}

resource "aws_instance" "app_server" {
  ami           = "ami-0efcece6bed30fd98"
  instance_type = "t2.micro"
  key_name = "ec2"
  # user_data = <<-EOF
  #               #!/bin/bash
  #               cd /home/ubuntu
  #               echo "<h1>Mensagem a ser mostrada</h1>" > index.html
  #               nohup busybox httpd -f -p 8080 &
  #               EOF


  tags = {
    Name = "neflix backend terraform ansible"
  }
}



# resource "aws_s3_bucket" "s3Bucket" {
#      bucket = "terraform-netflix-backend"
#      acl       = "public-read"

#      policy  = {
     
#       "id" : "MakePublic",
#       "version" : "2012-10-17",
#       "statement" : [
#         {
#           "action" : [
#               "s3:GetObject"
#             ],
#           "effect" : "Allow",
#           "resource" : "arn:aws:s3:::terraform-netflix-backend/*",
#           "principal" : "*"
#         }
#       ]
#     }

#     # website {
#     #     index_document = "index.html"
#     # }
# }
